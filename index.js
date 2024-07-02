const { Client, Intents, Collection, MessageEmbed, Permissions, MessageAttachment, utils, Utils, MessageActionRow, MessageSelectMenu, MessageButton, ButtonInteraction, ColorResolvable, CommandInteraction, EmojiResolvable, Message, MessageReaction, TextChannel, User, MessageButtonStyle, GuildMember, WebhookClient, Modal, TextInputComponent, Colors } = require('discord.js');

const client = new Client({
  intents: [32767],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
client.on("ready", () => {
  console.log(`${client.user.tag} Is Online!\nServers Count : ${client.guilds.cache.size}\nUesers count: ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`)});

module.exports = client;

client.SlashCommands = new Collection();
client.Events = new Collection();
client.Commands = new Collection();
client.aliases = new Collection();
client.setMaxListeners(50); 

["slashcommand", "events", "command"].forEach((handler) => {
  require(`./handlers/${handler}`)(client);
});
//====================================
process.on("uncaughtException", (error) => {
  return console.error(error);
});

process.on('unhandledRejection', async (error) => {
console.error('Unhandled promise rejection:', error);
  
  const errorChannel = await client.channels.fetch(ERROR_CHANNEL_ID);
  if (errorChannel) {
    const errorEmbed = new MessageEmbed()
      .setTitle('Unhandled Promise Rejection')
      .setDescription(`\`\`\`${error.stack || error}\`\`\``)
      .setColor('RED')
      .setTimestamp();

    errorChannel.send({ embeds: [errorEmbed] });
  }
});
 
client.on('error', async (error) => {
console.error('Client error:', error);
  
  const errorChannel = await client.channels.fetch(ERROR_CHANNEL_ID);
  if (errorChannel) {
    const errorEmbed = new MessageEmbed()
      .setTitle('Client Error')
      .setDescription(`\`\`\`${error.stack || error}\`\`\``)
      .setColor('RED')
      .setTimestamp();

    errorChannel.send({ embeds: [errorEmbed] });
  }
});

process.on("rejectionHandled", (error) => {
  return console.error(error);
});
//----------------------------------
const Canvas = require('canvas');
const db = require("pro.db");
const ms = require('ms');
const fs = require('fs');
const mongoose = require('mongoose');
const path = require('path');
//----------------------------------
const commandPaths = [
   './Commands/commandsmessage/twete'
];

let allCommands = {};

commandPaths.forEach(commandPath => {
    const commands = require(path.resolve(__dirname, commandPath));
    allCommands = { ...allCommands, ...commands };
});

const { gg, gg1, gg2, gg3 } = allCommands;

client.on("interactionCreate", async interaction => {
    gg(interaction);
    gg1(interaction);
    gg2(interaction);
    gg3(interaction);
    });

client.login("MTI1MTU5MDgzNjkyMDI1ODYwMQ.G4IUlI.lAnqvBk_m-4GlZQ3KtnNXHWDHrNLkUo7wHvcuk")
