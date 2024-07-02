const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, Intents, Collection, MessageEmbed, Permissions, MessageAttachment, utils, Utils, MessageActionRow, MessageSelectMenu, MessageButton, ButtonInteraction, ColorResolvable, CommandInteraction, EmojiResolvable, Message, MessageReaction, TextChannel, User, MessageButtonStyle, GuildMember, WebhookClient, Modal, TextInputComponent } = require('discord.js');
const { ownerID } = require('../../JSON/config.json');
module.exports = {
          data: new SlashCommandBuilder()
            .setName('تثبيت')
            .setDescription('تثبيت لوحة التحكم بالحسابات'),

          async execute(interaction) {

              if (interaction.member.permissions.has("ADMINISTRATOR")) {
const Embed = new MessageEmbed()
            .setAuthor(interaction.guild.name, interaction.guild.iconURL())
            .setColor('RED')
            .setThumbnail(interaction.guild.iconURL())
            .setTimestamp()
            .setTitle(`X Bot`)
            .setDescription(`لوحه تحكم X`);

        const Row = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('Create').setLabel('انشاء حساب').setStyle('PRIMARY'),
            new MessageButton().setCustomId('Change').setLabel('تغيير معلومات حسابك').setStyle('PRIMARY')
        );

        const Row1 = new MessageActionRow().addComponents(
            new MessageButton().setCustomId('Delete').setLabel('حذف حسابي').setStyle('DANGER'),
            new MessageButton().setCustomId('Info').setLabel('معلومات حسابي').setStyle('SECONDARY')
        );

        await interaction.channel.send({ embeds: [Embed], components: [Row, Row1] });
        await interaction.reply({ content: `Done Setup`, ephemeral: true });
    } else {
    interaction.reply({ content: 'ليس لديك الصلاحيات اللازمة لاستخدام هذا الأمر.', ephemeral: true });          
    }
          }
};