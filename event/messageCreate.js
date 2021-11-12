
module.exports = function(message) {
	const { content, author, client, channel } = message;
	const [commend, ...args] = content.split(' ');
	if (!channel.isText() || author.bot) return;
	// ///////////////////////////////////////////////////////////////////////////////////////////
	if (client.witelist.includes(author.id) && content.startsWith('🔑')) {//관리용 명령어
		return client.system_cmd?.get(commend)?.execute(message, args);
	}else{
		// client.system_message?.get(command)?.execute()
		// eval() -> 실행문 삽입
	}

};