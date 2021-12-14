'use strict';
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

let sequelize;
if(env == "production"){
  sequelize = new Sequelize(config);
}else if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = require(__dirname + "/init-models")(sequelize, Sequelize.DataTypes);


db.tableList = Object.keys(db);
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.getTableList = () =>{
    switch (sequelize.options.dialect) {
        case "sqlite":
            return sequelize.query(
              `SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'`,
              { type: sequelize.QueryTypes.SELECT }
            ).then(
              (data)=>data.map(({name})=>name)
            );
        default:
            return sequelize.query('SHOW Tables', { type: sequelize.QueryTypes.SHOWTABLES });
    }
}

const [cmd] = process.argv.slice(2);

db.getTableList().then(tables=>{
  const other1 = db.tableList.filter(x => !tables.includes(x)).length;
  const other2 = tables.filter(x => !db.tableList.includes(x)).length;

  if(other1 && other2){// 둘다 다름
    throw new Error(`[데이터베이스] 매칭에러 - 서버&클라이언트 양쪽 데이터베이스와 일치하지 않습니다!`);
  }else if(other1 + other2){// 
    throw new Error(`[데이터베이스] 매칭에러 - ${other1 ? '서버' : '클라이언트'}측 데이터베이스와 일치하지 않습니다!`);
  }
}).catch(e=>{
  if(cmd == "sync"){
    console.log(`SQL] 데이터베이스 매칭모드 - 서버 위주`);
    sequelize.sync().then(data=>{
      console.log(`SQL] Database init sync talbe`);
      console.log(`SQL] 데이터베이스 동기화가 완료되었습니다!()`);
    }).catch(console.error);
  }else{
    console.info(e);
    console.log(`
'npm run db'명령을 실행하여 주세요(서버 테이블과 매칭합니다.
클라이언트 위주로 매칭하시려면 
    `);
  }
  process.exit(-1);
});



module.exports = db;

/*
"production": {
  "dialect" : "sqlite",
  "storage": "config/database.db",
  "logging": true
}
*/