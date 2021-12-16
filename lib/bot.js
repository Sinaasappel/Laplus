const BotManager = require('./BotManager.js');
const config = require('../config.json');

const client = new BotManager(config);

client.lava.on('connect', () => {
    console.info('[Lavalink] Connected');
});

client.on('ready', (d) => {
    client.lava.connect(client.user.id);
    console.info('[Ready]', client.user.username, 'Connected');
});

client.on('messageCreate', (m) => {
    const ms = client.bUtils.contentSplit(m.content);
    if(ms[0] == 'play') {
        if(!client.bUtils.vcCheck(m)) return;
        if(!client.bUtils.argCheck(m, ms[1])) return;
        
        client.lava.rest.loadTracks(`ytmsearch:${ms[1]}`)
        .then(r => {
            client.lava
            .createPlayer(m.guildId)
            .connect(m.member.voice.channelId)
            .play(r.tracks[0]);
        });
    }
});

client.login(config.token);