const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    
    data : new SlashCommandBuilder()
    .setName('embed')
    .setDescription('Test Embed'),

    async execute(interaction) {

        const embed = new EmbedBuilder()
        .setColor('Blue')
        .setTitle('Test Embed!')
        .setDescription('Test description for template discord bot!')
        .addFields({name: 'Field 1', value: 'Field 2'})

        interaction.reply({embeds: [embed]});
    }
}
  

