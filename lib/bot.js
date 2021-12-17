const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const BotManager = require('./BotManager');
const config = require('../config.json');

const client = new BotManager(config);

const rest = new REST({version:'9'}).setToken(config.token);
if(config.pushGuild) pushGuild();
if(config.pushGlobal) pushGlobal();

client.login(config.token);

async function pushGuild() {
    try {
        console.info('Registering/Refreshing Application Commands [Guild]...');
        await rest.put(
            Routes.applicationGuildCommands(config.clientid, config.pushGuildId),
            {body:client.cmdsregis},
        );
        console.info('Successfully Registered/Refreshed Application Commands [Guild]')
    }
    catch (e) {
        console.error('[pushGuild] ERR :', e);
    }
}

async function pushGlobal() {
    try {
        console.info('Registering/Refreshing Application Commands [Global]...');
        await rest.put(
            Routes.applicationCommands(config.clientid),
            {body:client.cmdsregis},
        );
        console.info('Successfully Registered/Refreshed Application Commands [Global]')
    }
    catch (e) {
        console.error('[pushGlobal] ERR :', e);
    }
}