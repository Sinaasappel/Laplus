const { Client, Intents } = require('discord.js');
const { Node } = require('lavaclient');
const bUtils = require('./utils.js');
const LangFile = require('../etc/lang.json');

class BotManager extends Client {
    /**
     * @access private
     */
    lava;

    /**
     * @access private
     */
    bUtils;

    /**
     * @param config;
     */

    constructor(config) {
        super({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
        });

        this.lava = new Node({
            connection: config.lavalink[0],
            sendGatewayPayload: (i, p) => this.guilds.cache.get(i)?.shard?.send(p),
        });

        this.bUtils = new bUtils(LangFile);

        this.ws.on('VOICE_SERVER_UPDATE', (d) => this.lava.handleVoiceUpdate(d));
        this.ws.on('VOICE_STATE_UPDATE', (d) => this.lava.handleVoiceUpdate(d));
    }
}

module.exports = BotManager;