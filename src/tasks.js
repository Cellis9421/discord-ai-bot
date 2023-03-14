const { DISCORD_CLIENT_ID, DISCORD_TOKEN, ERROR_MESSAGE } = process.env;
const { REST, Routes } = require('discord.js');
const commands = require('./commands/commands');

/**
 * Refreshes the commands on the discord server
 */
const refreshCommands = async () => {
  try {
    const rest = new REST({ version: '10' }).setToken(DISCORD_TOKEN);
    console.log('Started refreshing application (/) commands.');
    const configs = commands.map((cmd) => cmd.config);
    await rest.put(Routes.applicationCommands(DISCORD_CLIENT_ID), { body: configs });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
};

/**
 * Handles all incoming slash commands by looking them up in the commands
 * array by name, and then calling their execute method.
 * @param {object} interaction the discord interaction object
 * @returns
 */
const handleCommands = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName } = interaction;
  console.log('Received chat command', commandName);
  try {
    const command = commands?.find((cmd) => cmd?.config?.name === commandName);
    if (!command?.execute) return;
    await command.execute(interaction);
  } catch (error) {
    console.error('Error handling commands', error);
    await interaction.reply(ERROR_MESSAGE);
  }
};

module.exports = {
  refreshCommands,
  handleCommands,
};
