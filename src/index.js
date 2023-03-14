// require dotenv
require('dotenv').config();

const { DISCORD_TOKEN, OPENAI_API_KEY } = process.env;
// eslint-disable-next-line import/order
const tasks = require('./tasks');

// Init/Refresh commands
tasks.refreshCommands();

// Init discord client
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Handle ready event(s)
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Handle slash commands
client.on('interactionCreate', tasks.handleCommands);

// Login
client.login(DISCORD_TOKEN);

// init openai client
// TODO: move this to a separate file
const { Configuration, OpenAIApi } = require('openai');

const openaiConfig = new Configuration({
  apiKey: OPENAI_API_KEY,
});

const openai = new OpenAIApi(openaiConfig);

module.exports = { openai };
