module.exports = function getState(client) {
	if (client.shard) {
		client.shard.fetchClientValues('guilds.cache.size').then(results => {
			client.setActivityProfile(`${results.reduce((acc, guildCount) => acc + guildCount, 0)}그룹과 함께`, 'PLAYING', 0);
		}).catch(e => {});
	}
	else {
		client.setActivityProfile(`${client.guilds.cache.size}개의 그룹과 함께`, 'PLAYING', 0);
	}
};