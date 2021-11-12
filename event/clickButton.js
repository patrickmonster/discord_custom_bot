
module.exports = async function(interaction) {
	const { client, customId: id, channelId, guild, user } = interaction;
	const [commend, ...args] = id.substring(`${client.user.discriminator}`.length).split(' '); // 명령어 처리
	const command = client.system_bt.get(commend);
	if (command) {// 이벤트 여부 확인
		console.log(`${guild ? guild.id : '아이디가 없음'}/${channelId}`, commend, args, '버튼 이벤트 처리', user.tag, twitch_auth_list.includes(command));
	}
	else {
		console.log(`${guild.id}/${id}`, `존재하지 않는 이벤트 ${commend}`, '버튼 이벤트 처리', user.tag);
	}
};
