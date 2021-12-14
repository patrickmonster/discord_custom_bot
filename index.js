require('dotenv').config();
const { ShardingManager } = require('discord.js');
const setting = require('./package.json');

const logger = require('#lib/logger');

const { sequelize } = require("#models")
// process.setMaxListeners(0);

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
sequelize.query(`SELECT * FROM dbtwitch.token WHERE use_yn = 'Y'`, {type: sequelize.QueryTypes.SELECT}).then((bots)=>{
    for (const bot of bots){
        manager_list[bot.idx] = createShard(bot);
    }
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