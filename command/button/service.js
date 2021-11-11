const deleteMessage = require('#discord/deleteMessage');

const isPermissionUser = require('#discord/isPermissionUser');
const getCommands = require('#util/getCommands'); // 커맨드 관리자

// const cmd = getCommands(`${__dirname}/service`);
/**
 * 스트리머 인증용
 * 서버 등록 및 트수 관리
 * const command = client.system_bt.get(commend);
 */
module.exports = {
	name: 'service',
	execute(interaction, user, args) {
		const { member, channel, message } = interaction;
		
		interaction.reply({ content: '응답 메세지', ephemeral: true });
		// const commend = cmd.get(command);
		// if (commend) {commend.execute(interaction, user, args);}
		// else {await interaction.reply({ content: '명령어를 찾지 못하였습니다.', ephemeral: true });}
	},
};
