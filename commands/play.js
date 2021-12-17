const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Play Some Music !')
		.addStringOption(option =>
			option.setName('song')
				.setDescription('Link Or Name Of The Music')
				.setRequired(true)
		),
	async execute(i, client) {
		const m = i.options.getString('song');
		if(!m) return i.editReply('No Song Input !');

		if(!client.bUtils.vcCheck(i)) return;

		const r = await client.lava.rest.loadTracks(`ytmsearch:${m}`);

		await i.editReply(`Found Song ! : ${r.tracks[0].info.title}`);

		await client.lava.createPlayer(i.guildId)
			.connect(i.member.voice.channel.id)
			.play(r.tracks[0]);

		await i.editReply(`Playing... : ${r.tracks[0].info.title}`);
	},
};