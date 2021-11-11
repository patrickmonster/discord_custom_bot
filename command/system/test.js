module.exports = {
	name: '$원격',
	description: '원격콘솔',
	help: '$인증 [twitch_(id/login)] {@특정사용자 생략시 본인}',
	async execute(message, args) {
		const { channel } = message;
		channel.send("TEST");
	},
};