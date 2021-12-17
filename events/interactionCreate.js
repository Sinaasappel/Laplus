module.exports = {
	name: 'interactionCreate',
	once: false,
	lava: false,
	async execute(i, client) {
		if(!i.isCommand()) return;
		const cmd = client.cmds.get(i.commandName);
		if(!cmd) return;

		try {
			await cmd.execute(i);
		}
		catch(e) {
			console.error('[ERR Try To Excute] :', i.commandName, e);
		}
	},
};