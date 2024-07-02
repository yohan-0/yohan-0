const client = require('..')
const PREFIX = require('../JSON/config.json')

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.SlashCommands.get(interaction.commandName);
    if (!command) return; 
            try{
                await command.execute(interaction);  
    }
     catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});