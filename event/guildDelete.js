// const getState = require('./lib/getState');
// const getMessage = require('#discord/getMessage');
// const webhooks = require('#discord/webhooks');

// const { live_on_channels, Op } = require('#models');


const { MessageMentions: { USERS_PATTERN } } = require('discord.js');

function getUserFromMention(mention) {
	const matches = mention.match(USERS_PATTERN);
	if (!matches) return;
	const id = matches[1];

	return client.users.cache.get(id);
}

module.exports = async function(guild) {
	try { console.log(guild.owner.user); }
	catch (e) { }
	
};