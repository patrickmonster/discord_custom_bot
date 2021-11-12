module.exports = {
	name : 'createChannelRoot',
	excute(client, id) {
		const channel = client.channels.cache.get(`${id}`);
		if (channel) {
			require('#mansion/mansion').execute({ client, channel });
		}
	},
};
