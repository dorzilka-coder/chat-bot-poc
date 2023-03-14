const { OpenAIApi, Configuration } = require('openai');

// Set up OpenAI API credentials
const config = new Configuration({
  apiKey: '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'
})

const openai = new OpenAIApi(config);


// Generate a response to a customer query
async function getChatbotResponse(query) {
  const prompt = `Q: ${query}\nA:`;

  try {
    const completions = await openai.createCompletion({
      model: 'davinci:ft-personal:cal-customer-support-2023-03-14-13-07-52',
      //suffix: '_cal-customer-support',
      prompt: prompt,
      max_tokens: 192,
      n: 1,
      // stop: ['\n'], // Stop generation at end of each answer
       temperature: 0 // Control the creativity of the generated responses
    });
  
    return completions.data.choices[0].text.trim();

  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
    } else {
      console.log(error.message);
    }
  }

}



// Example usage:
const query = 'אני מבצע עסקה ולא עובר הכרטיס, מה עושים?';
const response = getChatbotResponse(query).then(response => {
  console.log('response: ', response);
}).catch(error => {
  console.log('error: ', error);
});

