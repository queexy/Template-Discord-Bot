const { REST, Routes } = require('discord.js');
const fs = require('fs');

const commands = [];

for (const folder of fs.readdirSync('./commands')) {
    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('js'));

    for ( const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: '10'}).setToken('BOT_TOKEN'); //Bot token in https://discord.com/developers/applications Your bot -> Bot !

(async () => {
    try {
        console.log('Updating commands now!');

        const data = await rest.put(Routes.applicationCommands('APPLICATION_ID'), { body: commands })
        //Application ID in https://discord.com/developers/applications Your Bot -> General Information !

        console.log('Commands updated!');
    } catch (error) {
        console.error(error);
    }
})();