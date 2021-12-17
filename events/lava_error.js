module.exports = {
	name: 'error',
	once: false,
	lava: true,
	execute(d) {
    	console.error('[Lavalink ERR] Skipped Lavalink');
	},
};