//https://discord.com/oauth2/authorize?client_id=784933929584558115&scope=bot

console.log('Starting...');

require("dotenv").config();

const fs = require('fs');
const Discord = require('discord.js');
//const {prefix, token} = require('./config.json');
const prefix = process.env.PREFIX;
const token = process.env.CLIENT_TOKEN;

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.login(token);

client.on('ready', readyDiscord);

function readyDiscord(){
    console.log('Bot activated')
}


client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();
    
    if (!client.commands.has(command)) return;

        try {
            client.commands.get(command).execute(message, args);
        }   
        catch (error) {
            console.error(error);
            message.reply('there was an error trying to execute that command!');
        }
});