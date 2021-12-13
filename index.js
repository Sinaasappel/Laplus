const { Client, Intents } = require('discord.js');
const { Node, Cluster } = require('lavaclient');
const config = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES] });

/*lavalink client setup*/
const lava = new Node({
    connection: config.lavalink[0],
    sendGatewayPayload: (id, payload) => client.guilds.cache.get(id)?.shard?.send(payload),
})

client.ws.on('VOICE_SERVER_UPDATE', (d) => lava.handleVoiceUpdate(d));
client.ws.on('VOICE_STATE_UPDATE', (d) => lava.handleVoiceUpdate(d));

lava.connect(config.clientid);
/*lavalink client setup*/

client.once('ready', () => {
    client.user.setActivity('Laplus Ready To Play Sound !', {type:'LISTENING'});
    console.log(client.user.username, 'Logged In ! I\'m In !');
});

client.on('messageCreate', async (m) => {
    let vc = m.member.voice.channel;
    let vcme = m.guild.me.voice.channel;
    let ms = m.content.split(' ');
    if(ms[0] == 'play') {
        if(!vc) return m.channel.send('Join Voice Channel First');
        if(vcme && vc != vcme.id) return m.channel.send('You Are Not In The Same Room With Bot');
        if(!vc.joinable) return m.channel.send('I Not Have Permission To Join That Room !');
        if(!vc.speakable) return m.channel.send('I Not Have Permission To Speak In That Room !');

        const results = await lava.rest.loadTracks(`ytmsearch:${ms[1]}`);

        await lava
            .createPlayer(m.guildId)
            .connect(vc.id)
            .play(results.tracks[0]);
    }
});

client.login(config.token);