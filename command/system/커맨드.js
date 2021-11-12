const exec = require("child_process").exec;

const commands = {
	git : "git pull origin main",
	// log : "tail ~/.pm2/logs/main-bot-system-out.log -n 20",
	// err : "tail ~/.pm2/logs/main-bot-system-error.log -n 20",
	mem : `
top -n1 -b | grep Mem
echo Total
cat /proc/meminfo | grep Mem`,
}

module.exports = {
	name: '$커맨드',
	description: '명령처리',
	aliases: ["$c"],
	help: '$커맨드',
	async execute(message, args) {
		const { client, channel } = message;
		const [cmd] = args;

		if(cmd in commands){
			exec(commands[cmd], (error, sout, serr)=>{
				channel.send('```ini\nERROR\n' + serr + '```');
				channel.send('```ini\nOUT\n' + (sout || serr) + '```');
			});
		}else{
			message.reply(`명령어가 존재하지 않음 - ${Object.keys(commands)}`);
		}

	},
};
