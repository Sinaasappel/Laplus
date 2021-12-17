const { Client, Collection, Intents } = require('discord.js');
const { Node } = require('lavaclient');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const path = require("path");
const fs = require('fs');
const bUtils = require('./utils.js');
const LangFile = require('../etc/lang.json');

class BotManager extends Client {
    /**
     * @access private
     */
    lava;
    bUtils;

    /**
     * @param config;
     */
    constructor(config) {
        super({
            intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_VOICE_STATES]
        });

        this.cmds = new Collection();
        const cmdFiles = fs.readdirSync(path.resolve(__dirname, '../commands')).filter(f => f.endsWith('.js'));

        this.cmdsregis = [];

        for(const f of cmdFiles) {
            const cmd = require(`../commands/${f}`);
            console.info('Load Command :', cmd.data.name);
            this.cmds.set(cmd.data.name, cmd);
            this.cmdsregis.push(cmd.data.toJSON());
        }

        this.lava = new Node({
            connection: config.lavalink[0],
            sendGatewayPayload: (i, p) => this.guilds.cache.get(i)?.shard?.send(p),
        });

        const eventFiles = fs.readdirSync(path.resolve(__dirname, '../events')).filter(f => f.endsWith('.js'));

        for(const f of eventFiles) {
            const e = require(`../events/${f}`);
            if(e.lava) {
                this.lava.on(e.name, (...args) => e.execute(...args, this));
            } else if(e.once) {
                this.once(e.name, (...args) => e.execute(...args, this));
            } else {
                this.on(e.name, (...args) => e.execute(...args, this));
            }
        }

        this.bUtils = new bUtils(LangFile);

        this.ws.on('VOICE_SERVER_UPDATE', (d) => this.lava.handleVoiceUpdate(d));
        this.ws.on('VOICE_STATE_UPDATE', (d) => {
            if(d.user_id == this.user.id && d.deaf !== d.member.deaf) return;
            this.lava.handleVoiceUpdate(d);
        });
    }
}

module.exports = BotManager;