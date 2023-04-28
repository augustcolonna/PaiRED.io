const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "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"
});
const openai = new OpenAIApi(configuration);

async function start(prompt) {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 50,
    });

    return response.data.choices[0].text
}

module.exports = {
    start
  }