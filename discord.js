'use strict';
const [idx] = process.argv.slice(2);

const { Client, Intents } = require('discord.js');

const { sequelize } = require("#models");
const getCommands = require('#lib/getCommands'); // 커맨드 관리자
const logger = require('#lib/logger');

// ////////////////////////////////////////////////////////////////////////////////////////////////

function getQuerySelect(query, ...replacements) { return getQuery("SELECT", query, ...replacements)}
function getQuery(type = "SELECT", query, ...replacements){
	const q = `${type} ${query}`;
	logger.debug(q);
	return sequelize.query(q, { replacements, type: sequelize.QueryTypes[type] });
}

/**
 * 디버깅
 * @param {*} info 
 */
function debug(info) {
	if (info.includes('Exceeded identify threshold')) {
		const time = info.split(' ').pop();
		logger.error('디스코드 서비스 연결 문제', '연결 지연중...', time);
	}else if (info.includes('Session Limit Information')) {
		logger.error(`세션 제한 (잔여 연결수) ${info.replace('[WS => Manager] Session Limit Information', '')}`);
	}else if (info.includes('[DESTORY]') || info.includes('[CONNECT]')) {
		logger.warn(info);
	}
}

/**
 * 접속
 */
function ready(){
	logger.setName(client.user.tag);
	logger.log(`starting live service....`);
	logger.log(`Logged in as ${client.user.tag}!`);
	logger.log(`${client.guilds.cache.size}개의 길드에 접속중`);

}

/**
 * 명령처리
 * @param {*} interaction 
 * @returns 
 */
function interaction(interaction) {
	if (!interaction.inGuild()) return;
	if(interaction.isButton()) {
		
	};
	if(interaction.isSelectMenu()){
		
	};
}
// ////////////////////////////////////////////////////////////////////////////////////////////////
// "debug", "error", "ready", "shardError", "interactionCreate","presenceUpdate",
// "rateLimit", "shardReconnecting","shardResume","stageInstanceCreate",
// "stageInstanceDelete",

// 허용 이벤트
const exception_event = [
	"guildCreate", "guildDelete",
];

let client; // 구동 클라이언트
let g_token;

getQuerySelect("idx, token, owner, tag, log_level FROM dbtwitch.token WHERE use_yn = 'Y' AND idx = ?", idx).then(([{idx, token, owner, tag, log_level}])=>{
	g_token = token;
	logger.setName(tag);
	logger.setLevel(Object.keys(logger.levels)[log_level]);
	logger.log(`샤드 초기화 : ${idx}/${log_level}`);

	return getQuerySelect("name FROM recvie_intent WHERE idx = ?", idx);
}).then(intent_s=>{
	const intents = intent_s.map(({name})=>Intents.FLAGS[name]);

	logger.debug(`Join intent... Success! (${intents.length}) ${intents.join(", ")}`);
	client = new Client({ intents });

	client.logger = logger;

	// 관리봇 전용 커맨드
	if(idx >= 2)
		client.system_cmd = getCommands(`${__dirname}/command/system`);
	client.resetCompCmd = require('#home/init')(client);
	

	client.on('debug', debug);
	client.on('ready', ready);
	
	// 기본 운용에 필요한 서비스
	
	client.on('interactionCreate', interaction);
	client.on('shardError', require('#event/shardError'));
	client.on('messageCreate', require("#event/messageCreate"));

	client._getQuery = getQuery;
	client._getQueryS = getQuerySelect;
	client._idx = idx;
	return getQuerySelect("name FROM dbtwitch.recvie_event WHERE idx = ?", idx); // 이벤트 데이터 조회
}).then(event_s=>{ // 이벤트 조회

	const events = event_s.map(({name})=>name).filter(i=>exception_event.includes(i));
	logger.debug(`Getting discord client events! ${events.length}) ${events.join(", ")}`);
	
	for (const event of events)
		client.on(event, require(`#event/${event}`));

	logger.log(`Add events success!`);
	return client.login(g_token);
}).then(_=>{
	logger.log(`Shard connect by discord service`);
}).catch(e=>{
	logger.error(`샤드가 이벤트를 추가하는 도중, 오류가 발생하였습니다.`, e);
});
// ////////////////////////////////////////////////////////////////////////////////////////////////

/*
이벤트 등록
{
	idx : ""
	name : "경로",
	description : "설명",
	optionType : "subcommand" | "boolean" | "user" | "channel" | "rule" | "mention" | "string" | "int" | "number",
	use_yn : "Y", // 사용여부
	use_cmd : "Y", // 커맨드 명령?
	parent_idx : "", // 부모요소
	exec(){// 실행명령

	}
}


메세지 불러오는 컴포넌트

	return getQuerySelect("name, description, command, default_permission, `type`, parent_idx, use_cmd, option_type, update_at, register_id FROM dbtwitch.recvie_command WHERE owner_idx = ? AND use_yn = 'Y'", idx); // 이벤트 데이터 조회
}).then(commands=>{
	logger.debug(`Getting discord interaction commands...(${commands.length})`);

	for (const {idx : i,name, description, command, default_permission, type, parent_idx, use_cmd, option_type, update_at, register_id} of commands){
		const commandObject = {
			name, description, default_permission, type, parent_idx, use_cmd,option_type, register_id,
			subcommand : {}, // 하위 명령
			script : eval(command.startsWith("function") ? command : `function({ 
				client, channelId, guild, member, message,
				deferReply, deferUpdate, deleteReply, editReply, followUp, reply, update
			}){${command}}`),// 스크립트 해석
			exec({ 
				client, channelId, guild, member, message,
				deferReply, deferUpdate, deleteReply, editReply, followUp, reply, update
			}, [command, ...args]){
				client.logger.debug(`${user.tag}]${name}(${command}) - ${args,join(",")}`);
				this.script({
					client, channelId, guild, member, message,
					deferReply, deferUpdate, deleteReply, editReply, followUp, reply, update
				});// 커맨드 명령 실행
				if(args.length){// 하위 명령 실행
					const sub = subcommand[args[0]];
					if(sub){
						sub.exec({ 
							client, channelId, guild, member, message,
							deferReply, deferUpdate, deleteReply, editReply, followUp, reply, update
						},...args);//
					}
				}
			}// 실행명령
		};
		if(!register_id){
			// 등록이 되지 않은 명령 (명령실행ㄴ)
		}
		logger.debug(`${i}:[${update_at}]${name}(${description}) - ${["", "명령", "사용자", "메세지"][type]}명령을 불러옴`);
	}
	logger.log(`Success commands!`);
*/