module.exports = {
	name: 'interactionCreate',
	once: false,
	lava: false,
	async execute(i, client) {
		if(!i.isCommand()) return;
		const cmd = client.cmds.get(i.commandName);
		if(!cmd) return;

		let bypass = true;
        await i.deferReply()
        .catch(() => {
            console.error('[ERR Try To Defer] :', i.commandName);
            bypass = false;
        });
        if(!bypass) return;

		try {
			await cmd.execute(i, client);
		}
		catch(e) {
			console.error('[ERR Try To Excute] :', i.commandName, e);
		}
	},
};