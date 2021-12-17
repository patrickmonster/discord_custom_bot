module.exports = {
	name: '$관지라',
	description: '관리자 명령',
	help: '$관리자',
	async execute(message, args) {
		const { channel } = message;
		channel.send("TEST");
	},
};