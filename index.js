require('dotenv').config();
const { ShardingManager } = require('discord.js');
const setting = require('./package.json');

const { sequelize } = require("#models")
// process.setMaxListeners(0);

console.log(`
""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
███████╗██╗██████╗ ███████╗████████╗                                                
██╔════╝██║██╔══██╗██╔════╝╚══██╔══╝                                                
█████╗  ██║██████╔╝███████╗   ██║                                                   
██╔══╝  ██║██╔══██╗╚════██║   ██║                            Ver.${setting.version} 
██║     ██║██║  ██║███████║   ██║                            create by.patrick      
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

// 샤딩 메니져

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createShard({ idx, token, owner, memo, tag }){// 샤드 인스턴스 생성
    const manager = new ShardingManager('./discord.js', {
        totalShards: 'auto',
        shardArgs : [idx, tag],
        // token: process.env.DISCORD_TOKEN,
        token, respawn: true,
    });

    manager.on('shardCreate', shard => {
        console.log(`[${tag}]샤딩 생성`, shard.id);
    });
    manager.spawn(manager.totalShards, 5500, -1).then(shards => {
        shards.forEach(shard => {
            shard.on('message', message => {
                // onShardMessage(message);
                console.log(message);
            });
        });
    }).catch(console.error);
    return manager;
}


const manager_list = {};
sequelize.query(`SELECT * FROM dbtwitch.token WHERE use_yn = 'Y'`, {type: sequelize.QueryTypes.SELECT}).then((bots)=>{
    for ( const bot of bots){
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