require('dotenv').config();
const { ShardingManager } = require('discord.js');

// const [cmd] = process.argv.slice(2);
const setting = require('./package.json');

const { sequelize, getTableList } = require("#models");
// process.setMaxListeners(0);

const readline = require("readline");

console.log(`
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
███████╗██╗██████╗ ███████╗████████╗                                                
██╔════╝██║██╔══██╗██╔════╝╚══██╔══╝                                                
█████╗  ██║██████╔╝███████╗   ██║                                                   
██╔══╝  ██║██╔══██╗╚════██║   ██║                            Ver.${setting.version} 
██║     ██║██║  ██║███████║   ██║                          create by.patrickMonster 
╚═╝     ╚═╝╚═╝  ╚═╝╚══════╝   ╚═╝  _03                                              
 ██████╗██╗   ██╗███████╗████████╗ ██████╗ ███╗   ███╗    ██████╗  ██████╗ ████████╗
██╔════╝██║   ██║██╔════╝╚══██╔══╝██╔═══██╗████╗ ████║    ██╔══██╗██╔═══██╗╚══██╔══╝
██║     ██║   ██║███████╗   ██║   ██║   ██║██╔████╔██║    ██████╔╝██║   ██║   ██║   
██║     ██║   ██║╚════██║   ██║   ██║   ██║██║╚██╔╝██║    ██╔══██╗██║   ██║   ██║   
╚██████╗╚██████╔╝███████║   ██║   ╚██████╔╝██║ ╚═╝ ██║    ██████╔╝╚██████╔╝   ██║   
 ╚═════╝ ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝    ╚═════╝  ╚═════╝    ╚═╝   
                                                                                    
 """"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
`);
console.error(`========================[${new Date()}]========================`);

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createShard({ idx, token, owner, memo, tag, log_level }){// 샤드 인스턴스 생성
    console.log(`${idx}] Loading to bot ...`);
    console.log(`${idx}] ${token.split(/(?:)/u).map((v,i)=> i < 5 ? v : "*").join("")}`);
    console.log(`${idx}] ${owner}(${tag}) : ${log_level} ${memo}`);

    const manager = new ShardingManager('./discord.js', {
        totalShards: 'auto',
        shardArgs : [idx, log_level, tag],
        token, respawn: true,
    });

    manager.on('shardCreate', shard => { console.log(`[${tag}]샤딩 생성`, shard.id); });
    manager.spawn(manager.totalShards, 5500, -1).then(shards => {
        shards.forEach(shard => {
            shard.on('message', message => {
                console.log(message);
            });
        });
    }).catch(console.error);
    return manager;
}


const manager_list = {};
sequelize.query(`SELECT * FROM token WHERE use_yn = 'Y'`, {type: sequelize.QueryTypes.SELECT}).then(bots=>{
    if(bots.length)
        for (const bot of bots){
            try{
                manager_list[bot.idx] = createShard(bot);
            }catch(_){
                console.log(`${idx}] 샤드생성 에러`);
            }
        }
    else{
        const readline = require("readline");
        console.log(`SQL] 데이터베이스에 봇이 정의되어있지 않습니다!`);
    }
}).catch(e=>{ // sql 에러
    console.log(e);
    // 테이블 동기화
    getTableList().then(list=>{
        if(list.includes("token")){
            const readline = require("readline");
            console.log(`SQL] 데이터베이스에 봇 정보가 없습니다!`);
            console.log(`SQL] 봇의 토큰을 입력해 주세요 >`);

        }else{
            console.log(`SQL] 새로운 데이터베이스 입니다.`);
            console.log(`SQL] 데이터베이스를 동기화 합니다.`);
        }
        process.exit(-1)
    }).catch(e=>{
        console.log(`SQL] 데이터베이스 연결에 실패하였습니다. - 데이터베이스를 확인해 주세요.`);
        process.exit(-1)
    });
});

rl.on("line", function(line) {
    console.log("hello !", line);
    rl.close();
}).on("close", function() {
    process.exit();
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 알림 서비스
process.on('SIGINT', function() {
    for (const [k, manager] of Object.entries(manager_list)){
        manager.shards.forEach(shard=>shard.kill(1));
        console.log(`[Kill]${k}`);
    }
    console.log("샤드 다운");
    process.exit(1);
});