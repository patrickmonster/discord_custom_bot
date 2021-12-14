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
        try{
            manager_list[bot.idx] = createShard(bot);
        }catch(_){
            console.log(`${idx}] 샤드생성 에러`);
        }
    }
}).catch(_=>{ // sql 에러
    // 테이블 동기화
    console.log(`${idx}] sql table makeing...`);
    sequelize.sync().then(data=>{
        console.log(`${idx}] Database init sync talbe`);
        console.log(data);
        console.log(`
${idx}] 데이터베이스 동기화가 완료되었습니다!
Token 테이블에 사용자 정보를 입력하여 주세요!
        `);
    }).catch(console.error);
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



/*
CREATE TABLE `token` (
`idx` int NOT NULL AUTO_INCREMENT,
`token` varchar(100) DEFAULT NULL COMMENT '토큰',
`owner` varchar(100) DEFAULT NULL COMMENT '소유자',
`memo` varchar(100) DEFAULT NULL,
`tag` varchar(100) DEFAULT NULL,
`use_yn` varchar(1) CHARACTER SET euckr COLLATE euckr_korean_ci DEFAULT 'Y',
`log_level` int DEFAULT '3' COMMENT '로그 레벨',
`root_yn` varchar(1) DEFAULT 'N',
PRIMARY KEY (`idx`),
UNIQUE KEY `token_UN` (`tag`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=euckr COMMENT='토큰관리'

CREATE TABLE `recvie_intent` (
  `idx` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  KEY `recvie_intent_idx_IDX` (`idx`) USING BTREE,
  CONSTRAINT `recvie_intent_FK` FOREIGN KEY (`idx`) REFERENCES `token` (`idx`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=euckr COMMENT='인텐트'

CREATE TABLE `recvie_event` (
  `idx` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `exec` mediumtext COMMENT '실행명령',
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  KEY `recvie_event_idx_IDX` (`idx`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=euckr COMMENT='샤딩 이벤트'

CREATE TABLE `recvie_command` (
  `idx` int NOT NULL COMMENT '커맨드 명령(인터렉션)',
  `name` varchar(32) CHARACTER SET euckr COLLATE euckr_korean_ci NOT NULL COMMENT '명령 이름 (영문/띄워쓰기 x)',
  `description` varchar(100) DEFAULT NULL COMMENT '설명',
  `default_permission` varchar(1) CHARACTER SET euckr COLLATE euckr_korean_ci NOT NULL DEFAULT 'N' COMMENT '권한 여부',
  `type` varchar(1) CHARACTER SET euckr COLLATE euckr_korean_ci NOT NULL DEFAULT '1' COMMENT '입력방식 [1: 명령 2:사용자 3:메세지]',
  `create_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `parent_idx` int DEFAULT NULL COMMENT '부모 명령',
  `use_yn` varchar(1) CHARACTER SET euckr COLLATE euckr_korean_ci NOT NULL DEFAULT 'Y' COMMENT '사용여부',
  `use_cmd` varchar(1) CHARACTER SET euckr COLLATE euckr_korean_ci NOT NULL DEFAULT 'Y' COMMENT '커맨드 명령',
  `option_type` varchar(100) CHARACTER SET euckr COLLATE euckr_korean_ci NOT NULL DEFAULT 'string' COMMENT '옵션값',
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `register_id` varchar(150) DEFAULT NULL COMMENT '등록정보(등록된 고유 코드)',
  `owner_idx` int NOT NULL COMMENT '소유자',
  `command` mediumtext COMMENT '명령 실행코드',
  PRIMARY KEY (`idx`),
  UNIQUE KEY `recvie_command_UN` (`register_id`),
  KEY `recvie_command_owner_idx_IDX` (`owner_idx`) USING BTREE,
  KEY `recvie_command_parent_idx_IDX` (`parent_idx`) USING BTREE,
  CONSTRAINT `recvie_command_FK` FOREIGN KEY (`owner_idx`) REFERENCES `token` (`idx`),
  CONSTRAINT `recvie_command_FK_1` FOREIGN KEY (`parent_idx`) REFERENCES `recvie_command` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr COMMENT='실행 명령\r\nhttps://discord.com/developers/docs/interactions/application-commands#application-command-object-application-command-option-structure'

CREATE TABLE `command_process` (
  `idx` int NOT NULL,
  `comm` json DEFAULT NULL,
  `parent` int DEFAULT '-1',
  `create_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`idx`),
  KEY `command_process_parent_IDX` (`parent`) USING BTREE,
  CONSTRAINT `command_process_FK` FOREIGN KEY (`parent`) REFERENCES `command_process` (`idx`) ON DELETE RESTRICT,
  CONSTRAINT `command_process_FK_1` FOREIGN KEY (`idx`) REFERENCES `command` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr COMMENT='명령어 처리 과정'

CREATE TABLE `command_log` (
  `guild` varchar(20) NOT NULL DEFAULT 'DM' COMMENT '길드 id - DM은 ''DM'' 표기',
  `channel` varchar(20) NOT NULL COMMENT '채널ID',
  `user` varchar(20) NOT NULL COMMENT '유저ID',
  `command` varchar(200) DEFAULT NULL COMMENT '명령문',
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '생성시간',
  `type` varchar(1) NOT NULL DEFAULT 'T' COMMENT '메세지 타입\r\n	T : 텍스트(맨션)\r\n	B : 버튼\r\n	M: 매뉴\r\n	A : 어플리케이션\r\n	O : AutoComplete\r\n	C : 커맨드\r\n	P : 메세지 컴포넌트',
  `idx` int NOT NULL,
  KEY `command_log_guild_IDX` (`guild`) USING BTREE,
  KEY `command_log_channel_IDX` (`channel`) USING BTREE,
  KEY `command_log_user_IDX` (`user`) USING BTREE,
  KEY `command_log_idx_IDX` (`idx`) USING BTREE,
  CONSTRAINT `command_log_FK` FOREIGN KEY (`idx`) REFERENCES `token` (`idx`)
) ENGINE=InnoDB DEFAULT CHARSET=euckr COMMENT='사용자 명령 로그'

CREATE TABLE `command` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `create_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `type` varchar(2) CHARACTER SET euckr COLLATE euckr_korean_ci DEFAULT 'ms' COMMENT 'bt,ms,mu',
  `owner` varchar(100) CHARACTER SET euckr COLLATE euckr_korean_ci DEFAULT NULL COMMENT '소유주',
  `guild` varchar(20) DEFAULT NULL COMMENT '해당길드',
  `use_yn` varchar(1) CHARACTER SET euckr COLLATE euckr_korean_ci DEFAULT 'Y' COMMENT '''Y''',
  PRIMARY KEY (`idx`),
  FULLTEXT KEY `command_name_IDX` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=euckr COMMENT='명령어 테이블'
*/