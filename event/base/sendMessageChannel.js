module.exports = {
	name : 'sendMessageChannel',
	excute(client, id, text, url) {
		const channel = client.channels.cache.get(`${id}`);
		if (!channel) {
			return;
		}
		else if (url) {channel.send(text, { files: [{ attachment: url, name: 'userimg.jpg' }] });}
		else {channel.send(text);}
	},
};