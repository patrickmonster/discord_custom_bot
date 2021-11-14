module.exports = {
	name : 'sendMessageDM',
	excute(client, id, message, callback, options) {
		client.users.fetch(`${id}`).then(user => {
			if (!user) return false;
			try {
				if (options) {user.send({ content: message, embeds: [options] });}
				else {user.send({ content: message });}
				if (callback) callback(user);
			}
			catch (e) {
				console.log(`[Lib]sendMessageDM 메세지 전송 실패 ${id} / ${user}`);
			}
		});
	},
};