module.exports = {
	name : 'setActivityProfile',
	excute(client, message, type = 'LISTENING') {
		client.user.setActivity({name : message, type});
	},
};