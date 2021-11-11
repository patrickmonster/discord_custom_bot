'use strict';
require('dotenv').config();

const { Client, Intents } = require('discord.js');


const getCommands = require('./lib/getCommands'); // 커맨드 관리자

// const isDebug = process.argv.slice(2).length;

const client = new Client({ intents: [ /*Intents.FLAGS.DIRECT_MESSAGES,*/ Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

// ////////////////////////////////////////////////////////////////////////////////////////////////

client.on('debug', function(info) {
	if (info.includes('Exceeded identify threshold')) {
		const time = info.split(' ').pop();
		console.log('error', '디스코드 서비스 연결 문제', getMessage({ title: '연결 지연중...', main: time }));
	}
	else if (info.includes('Session Limit Information')) {
		console.log('error', 'Session Limit Information', getMessage({ title: '세션 제한 (잔여 연결수)', main: info.replace('[WS => Manager] Session Limit Information', '') }));
	}
	else if (info.includes('[DESTORY]') || info.includes('[CONNECT]')) {
		console.log(new Date(), info);
	}
});

client.on('error', function(e) {

});

// ////////////////////////////////////////////////////////////////////////////////////////////////



client.system_message = getCommands(`${__dirname}/command/message`);
client.system_cmd = getCommands(`${__dirname}/command/system`);
// client.system_bt = getCommands(`${__dirname}/command/button`);
// client.system_mu = getCommands(`${__dirname}/command/menu`);

client.command_mansion = require('#mansion/mansion');

client.witelist = [];

// ////////////////////////////////////////////////////////////////////////////////////////////////

client.once('ready', () => {
	console.log(`starting live service.... ${new Date()}`);
	console.log(`Logged in as ${client.user.tag}!`);
	client.setActivityProfile(`${client.guilds.cache.size}개의 그룹과 함께`, 'PLAYING', 0);
});


const message = require('#event/message');
const clickButton = require('#event/clickButton');
const clickMenu = require('#event/clickMenu');

const guildCreate = require('#event/guildCreate');
const guildDelete = require('#event/guildDelete');

const channelDelete = require('#event/channelDelete');

const shardError = require('#event/shardError');

// ////////////////////////////////////////////////////////////////////////////////////////////////

client.on('messageCreate', message);

// 상호작용 - 버튼이벤트
client.on('interactionCreate', function(interaction) {
	if (!interaction.inGuild() || !interaction.isButton()) return;
	clickButton(interaction);
});
// 상호작용 - 보조 매뉴 이벤트
client.on('interactionCreate', function(interaction) {
	if (!interaction.inGuild() || !interaction.isSelectMenu()) return;
	// const { type, id, applicationId, channelId, guildId, user, member, version, message, customId, componentType, deferred, ephemeral, replied, webhook, values } = interaction;
	console.log('click menu');
	clickMenu(interaction);
});

client.on('shardError', shardError);

client.on('channelDelete', channelDelete);

client.on('guildCreate', guildCreate);
client.on('guildDelete', guildDelete);
// ///////////////////////////////////////////////////////////////////////////////////////////

process.on('unhandledRejection', error => {
	console.error(error);
	console.log('error', 'unhandledRejection', getMessage({ title: '프로세서 에러', main: `${error}` }));
});

console.log(process.env.DISCORD_TOKEN_TEST);
client.login(isDebug ? process.env.DISCORD_TOKEN_TEST : process.env.DISCORD_TOKEN).catch(e => {
	console.error(e);
	console.log('error', '디스코드 컨넥션 에러', getMessage({ title: 'Client login error', main: `채널 로그인 에러${e}` }));
});

process.on('SIGINT', function() {
	console.error(`=============================${process.pid}번 프로세서가 종료됨=============================`);
	process.exit();
});
