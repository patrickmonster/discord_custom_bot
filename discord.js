'use strict';

const { Client, Intents } = require('discord.js');

const { sequelize } = require("#models");

const getCommands = require('./lib/getCommands'); // 커맨드 관리자

function getQuerySelect(query, ...replacements) { return getQuery("SELECT", query, ...replacements)}
function getQuery(type = "SELECT", query, ...replacements){
	return sequelize.query(query, { replacements, type: sequelize.QueryTypes[type] });
}

function debug(info) {
	if (info.includes('Exceeded identify threshold')) {
		const time = info.split(' ').pop();
		log[1]('디스코드 서비스 연결 문제', '연결 지연중...', time );
	}
	else if (info.includes('Session Limit Information')) {
		log[0]('Session Limit Information', "세션 제한 (잔여 연결수)", info.replace('[WS => Manager] Session Limit Information', ''));
	}
	else if (info.includes('[DESTORY]') || info.includes('[CONNECT]')) {
		log[0](new Date(), info);
	}
}

function ready(){
	[client._log,client._err,client._logs] = log;
	
	log[0](`starting live service.... ${new Date()}`);
	log[0](`Logged in as ${client.user.tag}!`);
	
	client._log(`${client.guilds.cache.size}개의 그룹과 함께`);
	// 프로세서 기본 정보를 불러옴
}

function interaction(interaction) {
	if (!interaction.inGuild()) return;
	if(interaction.isButton()) clickButton(interaction);
	if(interaction.isSelectMenu()) clickMenu(interaction);
}
// ////////////////////////////////////////////////////////////////////////////////////////////////
const [idx] = process.argv.slice(2);

const log = require('./lib/logManager')(idx);

let client;

// process.argv.slice(2)
getQuerySelect("select name from recvie_intent where idx = ?", idx).then(intent_s=>{
	const intents = intent_s.map(({name})=>Intents.FLAGS[name]);
	client = new Client({ intents });

	client.system_cmd = getCommands(`${__dirname}/command/system`);
	client.resetCompCmd = require('#event/init')(client);
	
	client.on('shardError', require('#event/shardError'));
	client.on('interactionCreate', interaction);
	client.on('debug', debug);
	client.on('ready', ready);

	client._getQuery = getQuery;
	
	return getQuerySelect("select name from recive_event where idx = ?", idx);
}).then(event_s=>{
	for(const { name } of event_s) client.on(name, require(`#event/${name}`));// 이벤트 등록
	return client.login(process.env.DISCORD_TOKEN);
}).then(o=>{
	console.log(`[샤드]클라이언트가 성공적으로 구성됨`,o.slice(0,15));
}).catch(e=>{
	console.error(e);
});
// ////////////////////////////////////////////////////////////////////////////////////////////////