module.exports = {
	name: 'ready',
	once: false,
	lava: false,
	execute(client) {
		client.lava.connect(client.user.id);
        console.info('[BOT][Ready]', client.user.username, 'Connected');
	},
};