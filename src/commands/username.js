/**
 * Command to generate usernames using OpenAI's GPT-3.5 API
 */
module.exports = {
  config: {
    name: 'username',
    description: 'Generates some usernames for you.',
    options: [
      {
        name: 'text_prompt',
        description: 'Manually enter the type of username to generate',
        type: 3,
      },
      {
        name: 'quickname',
        description: 'Quick categories to generate names from',
        type: 3,
        choices: [
          {
            name: 'cars',
            value: 'cars',
          },
          {
            name: 'computers',
            value: 'computers',
          },
          {
            name: 'nouns',
            value: 'nouns',
          },
          {
            name: 'verbs',
            value: 'verbs',
          },
          {
            name: 'airplanes',
            value: 'airplanes',
          },
        ],
      },
      {
        name: 'qty',
        description: 'Total usernames to generate (1-20)',
        type: 4,
      },
      {
        name: 'max_length',
        description: 'Max length of each username (1-50)',
        type: 4,
      },
      {
        name: 'include_sentence',
        description: 'Includes a short sentence about the username',
        type: 5,
      },
    ],
  },
  execute: async (interaction) => {
    const { ERROR_MESSAGE } = process.env;
    const { options } = interaction;
    const { openai } = require('../index');

    try {
      // allow for quickname generation with the quickname option, but allow for manual topic entry first
      const quickname = options?._hoistedOptions?.find((option) => option.name === 'quickname')?.value;
      const topic = options?._hoistedOptions?.find((option) => option.name === 'text_prompt')?.value || quickname || 'party time';

      // allow for custom qty and max_length
      let qty = options?._hoistedOptions?.find((option) => option.name === 'qty')?.value || 10;
      qty = parseInt(qty); // convert to int
      if (qty > 20) qty = 20; // clamp to max 20.
      if (qty <= 0) qty = 1; // clamp to min 1.

      let length = options?._hoistedOptions?.find((option) => option.name === 'max_length')?.value || 14;
      length = parseInt(length); // convert to int
      if (length > 50) length = 50; // clamp to max 50.
      if (length <= 0) length = 1; // clamp to min 1.

      const includeSentence = options?._hoistedOptions?.find((option) => option.name === 'include_sentence')?.value || false;
      // resond with a loading message (within 3 seconds of getting the request)
      await interaction.reply(`Generating ${qty} x ${topic} username(s) with a max length of ${length} characters...`);

      // generate the username(s)
      const systemPrompt = 'You are a player thinking of usernames.';
      const prompt = `
      Generate ${qty} usernames ${length} characters or less. 
      Make them weird, funny, inuendos, but most importantly about ${topic}. 
      Only respond with the usernames ${includeSentence ? 'and a catchy sentence about it' : ''} 
      `;

      const chatGPT = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: prompt },
        ],
      });

      // log the generated username(s)
      const content = chatGPT?.data?.choices[0]?.message?.content || ERROR_MESSAGE;

      // edit the response to the user with the generated username(s)
      await interaction.editReply(content);
    } catch (e) {
      console.log(e);
      await interaction.editReply(ERROR_MESSAGE);
    }
  },
};
