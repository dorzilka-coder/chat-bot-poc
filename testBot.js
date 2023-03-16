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
      model: 'ada:ft-cal-digital:cal-customer-support-classification-2023-03-16-14-48-11',
      //suffix: '_cal-customer-support',
      prompt: prompt,
      max_tokens: 2,
      n: 1,
      logprobs: 1,
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
const query = 'שלום אני טס לחול מחר' + ' \n\n###\n\n';
getChatbotResponse(query).then(response => {
  console.log('response: ', response);
}).catch(error => {
  console.log('error: ', error);
});

// results:
// 1 = ChangeCreditLimit
// 2 = BlockCard
// 3 = GoingAbroad
// 4 = SecretCode

