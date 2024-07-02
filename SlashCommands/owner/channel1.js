const { SlashCommandBuilder } = require('@discordjs/builders');
const db = require('pro.db');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('شات_التغريدات')
        .setDescription('تثبيت شات التغريدات')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('اختر الشات الخاص بالتغريدات')
                .setRequired(true)
        ),

     async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        if (interaction.member.permissions.has("ADMINISTRATOR")) {
            db.set(`channel1.${interaction.guild.id}`, channel.id);
            interaction.reply({ content: `**تم بنجاح اختيار روم ${channel} علي انها روم التغريدات**` });
        } else {
            interaction.reply({ content: 'ليس لديك الصلاحيات اللازمة لاستخدام هذا الأمر.', ephemeral: true });
        }
    }
};