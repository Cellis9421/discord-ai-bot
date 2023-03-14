# discord-ai-bot

A Discord Bot integrated with openai for various fun slash commands. This project is mainly a playground for me to explore the discord api and openai api.

## Features

- [Discord API Integration][discord-api-docs] - Application Command Registration & Request Handling
- [OpenAI API Integration][openai-api-docs] - Chat Completion

## Setup

- Pull the repo
- Copy & fill out the `.env.example` file (\*\*Be sure to set up a billable api key with [openai][openai-api-keys] before begining or most of this program wont work.
  )
- Open terminal in project root directory then run

```shell
npm i
npm run dev
```

This will start a nodemon server allowing you to explore the project locally and see the changes instantly.

## Slash Commands

### /username

Generates 1-20 random usersnames of a given topic with a length between 1-50. Uses openai AI to generate the names.

Supports the following params

```js
{
  name: 'text_prompt',
  description: 'Manually enter the type of username to generate',
}
{
  name: 'quickname',
  description: 'Quick categories to generate names from',
}
{
  name: 'qty',
  description: 'Total usernames to generate (1-20)',
}
{
  name: 'max_length',
  description: 'Max length of each username (1-50)',
}
{
  name: 'include_sentence',
  description: 'Includes a short sentence about the username',
}
```

### /badadvice

Generates bad advice based on the given text_prompt.

i.e. "how to catch a fish" or "how to do good in school"

Supports the following params

```js
{
  name: 'text_prompt',
  description: 'Manually enter the type of username to generate',
}
```

[discord-api-docs]: https://discord.com/developers/docs/interactions/application-commands
[openai-api-docs]: https://platform.openai.com/docs/guides/chat
[openai-api-keys]: https://platform.openai.com/account/api-keys
