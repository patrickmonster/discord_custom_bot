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
console.error(`=============================================[${new Date()}]========================================`);

// 샤딩 메니져

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////
function createShard({ idx, token, owner, memo, tag }, shardArgs = []){// 샤드 인스턴스 생성
    const manager = new ShardingManager('./discord.js', {
        totalShards: 'auto',
        shardArgs,
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
sequelize.query(`select * from dbtwitch.token;`, {type: sequelize.QueryTypes.SELECT}).then((bots)=>{
    for ( const bot of bots){
        manager_list[bot.idx] = createShard(bot, [bot.idx]);
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 알림 서비스
process.on('SIGINT', function() {
    //
    console.log("샤드 다운");
});