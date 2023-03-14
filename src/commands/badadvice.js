/**
 * Command to generate bad advice using OpenAI's GPT-3.5 API
 */
module.exports = {
  config: {
    name: 'badadvice',
    description: 'Generates some bad advice for you.',
    options: [
      {
        name: 'text_prompt',
        description: 'What do you want advice about?',
        type: 3,
      },
    ],
  },
  execute: async (interaction) => {
    const { ERROR_MESSAGE } = process.env;
    const { options } = interaction;
    const { openai } = require('../index');

    try {
      const topic = options?._hoistedOptions?.find((option) => option.name === 'text_prompt')?.value;

      // resond with a loading message (within 3 seconds of getting the request)
      await interaction.reply(`Getting advice about ${topic}...`);

      // generate the bad advice
      const systemPrompt = `You are a horrible life coach. You are giving bad advice to a client. 
      You can only give funny, crazy, or absurd life advice.`;
      const prompt = `Give me bad advice about ${topic}.`;

      const chatGPT = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
      });

      const content = chatGPT?.data?.choices[0]?.message?.content || ERROR_MESSAGE;

      // edit the response to the user with the generated bad advice
      await interaction.editReply(`**Q:** ${topic}\n**A:** ${content}`);
    } catch (e) {
      console.log(e);
      await interaction.editReply(ERROR_MESSAGE);
    }
  },
};
