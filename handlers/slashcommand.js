const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const ascii = require('ascii-table');
const table = new ascii('SlashCommands');
table.setHeading('SlashCommand', 'Load Status');
const botID = process.env.botID;
const SlashCommands = [];

module.exports = client => {
    fs.readdirSync('./SlashCommands').forEach((folder) => {
        const commandFiles = fs.readdirSync(`./SlashCommands/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of commandFiles) {
            const command = require(`../SlashCommands/${folder}/${file}`);
            if (!command.data) {
                console.log(`Error: ${file} does not have valid data.`);
                continue;
            }
            SlashCommands.push(command.data.toJSON());
            if (command.data.name) {
                client.SlashCommands.set(command.data.name, command);
                table.addRow(file, '✅ ' + 'Success');
            } else {
                table.addRow(file, '❌ ' + 'Filed');
                continue;
            }
        }
    });
    console.log(table.toString());

    const rest = new REST({ version: '9' }).setToken(process.env.token);
    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(botID),
                { body: SlashCommands },
            );
            console.log(`Successfully registered ${SlashCommands.length} commands.`);
        } catch (error) {
            if (error) console.error(error);
        }
    })();
}
