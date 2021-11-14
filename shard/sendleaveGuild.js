module.exports = {
	name : 'sendleaveGuild',
	excute(client, id) {
		client.guilds.fetch(`${id}`).then(guild => {
			console.log(`[System] 길드 탈퇴요청 (관리자) -> ${guild.id} ${guild.name} ${guild.icon}`);
			guild.leave();
		}).cache(_ => { });
	},
};
