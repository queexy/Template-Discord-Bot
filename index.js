const { Client, GatewayIntentBits, ActivityType, Collection} =  require ('discord.js');
const fs = require('fs');

const client  = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.commands = new Collection();

for (const folder of fs.readdirSync('./commands')) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

        client.commands.set(command.data.name, command);
    }
}

client.once('ready', () => {
    console.log("Bot online");
    client.user.setPresence({ activities: [{ name: 'Template by queexy#4904!', type: ActivityType.Playing}] });
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if(!command) {
        return console.error("Don't found this command!");
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: "Error", ephemeral: true});
    }
});

client.login('BOT_TOKEN'); //Bot token in https://discord.com/developers/applications Your bot -> Bot -> View Token or Reset Token !