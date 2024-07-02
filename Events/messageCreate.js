const { PREFIX } = require('../JSON/config.json');
const { Collection } = require('discord.js');
const delay = new Collection();
const ms = require('ms');

module.exports = {
    name: 'messageCreate',
    async execute(client, message) {
        if (!message.content.startsWith(PREFIX) || message.author.bot) return;
        const args = message.content.slice(PREFIX.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        try {
            const commandFiles = client.Commands.get(command) || client.Commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));
            if (!commandFiles) return;
            if (commandFiles){
                const authorPerms = message.channel.permissionsFor(message.author);
                if(commandFiles.permissions){
                    if(!authorPerms || !authorPerms.has(commandFiles.permissions)){
                        return message.reply('you do not have the required permissions to execute that command!')
                        .then((sent) => {
                 
                          setTimeout(() => {
                                sent.delete();
message.delete();                             
                            }, 10000)
                        });
                    };
                };
                if (commandFiles.cooldown) {
                    if (delay.has(`${commandFiles.name}-${message.author.id}`)) return message.reply(`You can use this command again after **${ms(delay.get(`${commandFiles.name}-${message.author.id}`) - Date.now(), { long: true }).includes('ms') ? '0 second' : ms(delay.get(`${commandFiles.name}-${message.author.id}`) - Date.now(), { long: true })}**`)
                    .then((sent) => {
                    setTimeout(() => {
                        sent.delete();
                    }, 4000)
                })
                    commandFiles.execute(client, message, args);
                    delay.set(`${commandFiles.name}-${message.author.id}`, Date.now() + commandFiles.cooldown)
                    setTimeout(() => {
                        delay.delete(`${commandFiles.name}-${message.author.id}`);
                    }, commandFiles.cooldown)
                    if(authorPerms.has(commandFiles.permissions)){
                        delay.delete(`${commandFiles.name}-${message.author.id}`);
                    }
                        
                } else {
                    commandFiles.execute(client, message, args);
                };
            };
            
            
        } catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');

        }
    }
}