const { Client, Intents, Collection, MessageEmbed, Permissions, MessageAttachment, utils, Utils, MessageActionRow, MessageSelectMenu, MessageButton, ButtonInteraction, ColorResolvable, CommandInteraction, EmojiResolvable, Message, MessageReaction, TextChannel, User, MessageButtonStyle, GuildMember, WebhookClient, Modal, TextInputComponent } = require('discord.js');
const db = require('pro.db')
//----------------------------------
async function gg(interaction) {
    if (interaction.isButton()) {
        if (interaction.customId === 'Create') {
        const Data = await db.get(`account.${interaction.user.id}`)
        if (Data) return interaction.reply({ content: `**لــديك حسـاب بالـفـعل** :x:`, ephemeral: true }).catch(() => {})
            const moda55l = new Modal()
      .setTitle('انشاء حساب في X')
      .setCustomId(`Create_Modal`);

    const u7 = [
      new TextInputComponent()
        .setCustomId('DisplayName')
        .setLabel('اسم المستخدم')
        .setMaxLength(300)
        .setRequired(true)
        .setStyle('PARAGRAPH'),
      new TextInputComponent()
        .setCustomId('Username')
        .setLabel('يوزر السمتخدم')
        .setMaxLength(300)
        .setRequired(true)
        .setStyle('PARAGRAPH'),
      new TextInputComponent()
        .setCustomId('Email')
        .setLabel('البريد الخاص بك')
        .setPlaceholder('example@gmail.com')
        .setMaxLength(1000)
        .setRequired(true)
        .setStyle('PARAGRAPH'),
        new TextInputComponent()
        .setCustomId('Password')
        .setLabel('الباسوورد الخاص بك')
        .setPlaceholder('example : 123456')
        .setMaxLength(100)
        .setRequired(true)
        .setStyle('PARAGRAPH')
    ];

    const rows = u7.map(
      (component) => new MessageActionRow().addComponents(component)
    );
    moda55l.addComponents(...rows);
    interaction.showModal(moda55l);
        }
    } else if (interaction.isModalSubmit()) {
        if (interaction.customId === 'Create_Modal') {
            const DisplayName = interaction.fields.getTextInputValue('DisplayName')
            const Username = interaction.fields.getTextInputValue('Username')
            const Email = interaction.fields.getTextInputValue('Email')
            const Password = interaction.fields.getTextInputValue('Password')
             db.set(`account.${interaction.user.id}`, {
                _id: interaction.user.id,
                DisplayName: DisplayName,
                Username: Username,
                Email: Email,
                Password: Password
            })
            interaction.reply({ content: `تــم انـشاء الـحـساب الـخاص بــك بنـجاح :white_check_mark:`, ephemeral: true }).catch(() => {})
        }
    }
}
//----------------------------------
async function gg1(interaction) {
    if (interaction.isButton()) {
        if (interaction.customId === 'Change') {
        const Data = await db.get(`account.${interaction.user.id}`)
        if (Data) return interaction.reply({ content: `**لــديك حسـاب بالـفـعل** :x:`, ephemeral: true }).catch(() => {})
            const moda5l = new Modal()
      .setTitle('انشاء حساب في X')
      .setCustomId(`Edit_Modal`);

    const u6 = [
      new TextInputComponent()
        .setCustomId('DisplayName')
        .setLabel('اسم المستخدم')
        .setMaxLength(300)
        .setRequired(true)
        .setStyle('PARAGRAPH'),
      new TextInputComponent()
        .setCustomId('Username')
        .setLabel('يوزر السمتخدم')
        .setMaxLength(300)
        .setRequired(true)
        .setStyle('PARAGRAPH'),
      new TextInputComponent()
        .setCustomId('Email')
        .setLabel('البريد الخاص بك')
        .setPlaceholder('example@gmail.com')
        .setMaxLength(1000)
        .setRequired(true)
        .setStyle('PARAGRAPH'),
        new TextInputComponent()
        .setCustomId('Password')
        .setLabel('الباسوورد الخاص بك')
        .setPlaceholder('example : 123456')
        .setMaxLength(100)
        .setRequired(true)
        .setStyle('PARAGRAPH')
    ];

    const rows = u6.map(
      (component) => new MessageActionRow().addComponents(component)
    );
    moda5l.addComponents(...rows);
    interaction.showModal(moda5l);
        }
    } else if (interaction.isModalSubmit()) {
        if (interaction.customId === 'Edit_Modal') {
            const DisplayName = interaction.fields.getTextInputValue('DisplayName')
            const Username = interaction.fields.getTextInputValue('Username')
            const Email = interaction.fields.getTextInputValue('Email')
            const Password = interaction.fields.getTextInputValue('Password')
            await db.set(`account.${interaction.user.id}`, { 
                _id: interaction.user.id }, { 
                DisplayName: DisplayName,
                Username: Username,
                Email: Email,
                Password: Password })
            interaction.reply({ content: `تــم انـشاء الـحـساب الـخاص بــك بنـجاح :white_check_mark:`, ephemeral: true }).catch(() => {})
        }
    }
}
//----------------------------------
async function gg2(interaction) {
   if (interaction.isButton()) {
        if (interaction.customId === 'Delete') {
        const Data = await db.get(`account.${interaction.user.id}`)
        if (!Data) return interaction.reply({ content: `**لا يوجد لديك حسـاب** :x:`, ephemeral: true }).catch(() => {})
        const Embed = new MessageEmbed()
        .setDescription(`هل انت متأكد من انك تريد حذف حسابك في تويتر بالفعل ؟`)
        const Row = new MessageActionRow()
        .addComponents(
        new MessageButton()
        .setCustomId('Yes')
        .setLabel('نعم')
        .setStyle("GANGER"), 
        new MessageButton()
        .setCustomId('No')
        .setLabel('لا')
        .setStyle("SUCCSESS"))
        interaction.reply({ embeds: [Embed], components: [Row], ephemeral: true })
        } else if (interaction.customId === 'Yes') {
            await db.delete(`account.${interaction.user.id}`).then(async () => {
            await interaction.deferUpdate()
            await interaction.editReply({ content: `**تم حـذف الحساب بنجاح :white_check_mark:**`, components: [],  embeds: [], ephemeral: true })
            })
        } else if (interaction.customId === 'No') {
            await interaction.deferUpdate()
            await interaction.deleteReply()
        }
   }
}
//----------------------------------
async function gg3(interaction) {
   if (interaction.isButton()) {
        if (interaction.customId === 'Info') {
        const Data = await db.get(`account.${interaction.user.id}`)
        if (!Data) return interaction.reply({ content: `**لا يوجد لديك حسـاب** :x:`, ephemeral: true }).catch(() => {})
        const Embed = new MessageEmbed()
        .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.displayAvatarURL()})
        .setTitle(`معلومات حسابك`).setThumbnail(interaction.user.displayAvatarURL()).setTimestamp()
        .addFields(
            { name: 'اسم المستخدم', value: Data.DisplayName },
            { name: 'يوزر المستخدم', value: Data.Username },
            { name: 'ايميل المستخدم', value: Data.Email },
            { name: 'كلمه مرور المستخدم', value: Data.Password },
        )
        
        interaction.reply({ embeds: [Embed] , ephemeral: true })      
        }
   }
}

//----------------------------------
module.exports = {
    gg,
    gg1,
    gg2,
    gg3
}