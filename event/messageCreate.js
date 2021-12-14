module.exports = function(message) {
	const { content, guild, author, client, channel, mentions } = message;
	const [mm, command, ...args] = content.split(' ');
	// 텍스트메세지, 봇아님, 맨션 메세지
	if (!channel.isText() || author.bot || !mentions.users.has(client.user.id)) return;
	// ///////////////////////////////////////////////////////////////////////////////////////////

	if(!new RegExp(`/<@!?${client.user.id}>/g`).test(mm)){// 멘션여부 확인
		message.reply(`메세지 구분이 틀렸습니다. ${client.user} [명령문] [명령 매개변수...]`);
		return;
	}else{
		
	}

	// 명령어 기록
	client.getQuery(
		"INSERT", "INTO command_log (guild, channel, `user`, command, `type`) VALUES(?, ?, ?, ?, 'T')",
		channel.type == 'dm' ? "DM" : `${guild.id}`,
		`${channel.id}`,
		`${author.id}`,
		[ command, ...args].join(" ")
	);
};
/*
메세지 타입
	T : 텍스트(맨션)
	B : 버튼
	M: 매뉴
	A : 어플리케이션
	O : AutoComplete
	C : 커맨드
	P : 메세지 컴포넌트
*/