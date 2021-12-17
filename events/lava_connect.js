module.exports = {
	name: 'connect',
	once: false,
	lava: true,
	execute(d) {
		if(!d) return;
    	console.info('[Lavalink] Connected');
	},
};