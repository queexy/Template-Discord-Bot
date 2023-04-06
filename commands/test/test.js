const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    
    data : new SlashCommandBuilder()
        .setName("test")
        .setDescription("Test command!"),
        
    async execute(interaction) {
        interaction.reply("Test command working!");
    }
}