'use strict';
const [idx, log_level ,name] = process.argv.slice(2);

const { Client, Intents } = require('discord.js');
// const {} = require('discord.js/src/client/actions/GuildStickersUpdate');

const { sequelize } = require("#models");

const getCommands = require('./lib/getCommands'); // 커맨드 관리자

const messageCreate = require('#event/messageCreate');
const clickButton = require('#event/clickButton');
const clickMenu = require('#event/clickMenu');

const guildCreate = require('#event/guildCreate');
const guildDelete = require('#event/guildDelete');


const logger = require('#lib/logger');
logger.setName(name);
logger.setLevel(Object.keys(logger.levels)[log_level]);
logger.log(`샤드 초기화 : ${log_level}`);

// ////////////////////////////////////////////////////////////////////////////////////////////////

function getQuerySelect(query, ...replacements) { return getQuery("SELECT", query, ...replacements)}
function getQuery(type = "SELECT", query, ...replacements){
	return sequelize.query(`${type} ${query}`, { replacements, type: sequelize.QueryTypes[type] });
}

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

function ready(){
	logger.log(`starting live service....`);
	logger.log(`Logged in as ${client.user.tag}!`);
	logger.log(`${client.guilds.cache.size}개의 그룹과 함께`);

}

function interaction(interaction) {
	if (!interaction.inGuild()) return;
	if(interaction.isButton()) clickButton(interaction);
	if(interaction.isSelectMenu()) clickMenu(interaction);
}
// ////////////////////////////////////////////////////////////////////////////////////////////////

const exception_event = [
	"debug", "error", "ready", "shardError", "interactionCreate","presenceUpdate",
	"rateLimit", "shardReconnecting","shardResume","stageInstanceCreate",
	"stageInstanceDelete",
];

let client;

// process.argv.slice(2)
getQuerySelect("name FROM recvie_intent WHERE idx = ?", idx).then(intent_s=>{
	const intents = intent_s.map(({name})=>Intents.FLAGS[name]);

	logger.debug(`샤드가 인텐트 조회에 성공하였습니다(${intents.length}) ${intents.join(", ")}`);
	client = new Client({ intents });

	client.logger = logger;

	if(idx >= 2)
		client.system_cmd = getCommands(`${__dirname}/command/system`);
	client.resetCompCmd = require('#home/init')(client);
	
	client.on('shardError', require('#event/shardError'));
	client.on('interactionCreate', interaction);

	client.on('debug', debug);
	client.on('ready', ready);
	
	// client.on('messageCreate', messageCreate);
	// client.on('guildCreate', guildCreate);
	// client.on('guildDelete', guildDelete);

	client._getQuery = getQuery;
	client._getQueryS = getQuerySelect;
	client._idx = idx;


	logger.log(`샤드가 인텐트 및 초기화에 성공하였습니다.`);
	return getQuerySelect("name FROM dbtwitch.recvie_event WHERE idx = ?", idx);
	// return client.login(process.env.DISCORD_TOKEN);
}).then(event_s=>{
	const events = event_s.map(({name})=>name).filter(i=>!exception_event.includes(i));
	
	logger.debug(`샤드가 이벤트 조회에 성공하였습니다(${events.length}) ${events.join(", ")}`);
	
	for (const event of events)
		client.on(event, (p1, p2)=>{
			/*
			p1 : APIRequest, ApplicationCommand, 
				DMChannel, TextBasedChannels, 
				GuildEmoji, GuildBan, Guild, GuildMember, GuildChannel,
				Interaction, Invite, Message, Collection<Snowflake, Message>, MessageReaction,
				Role


			invalidRequestWarning -> 사용자 과실
			*/
		});

	logger.log(`샤드가 이벤트를 추가하였습니다.`);
	return client.login(process.env.DISCORD_TOKEN);
}).then(o=>{
	logger.log(`샤드에서 봇이 성공적으로 연결되었습니다.`);
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
*/