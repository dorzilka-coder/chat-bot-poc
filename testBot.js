const { OpenAIApi, Configuration } = require('openai');

// Set up OpenAI API credentials
const config = new Configuration({
  apiKey: ''
})

const openai = new OpenAIApi(config);


// Generate a response to a customer query
async function getChatbotResponse(query) {
  const prompt = query; // `Q: ${query}\nA:`;

  try {
    const completions = await openai.createCompletion({
      model: 'davinci:ft-cal-digital-2023-03-28-06-58-36', //'ada:ft-cal-digital:cal-customer-support-classification-2023-03-19-08-54-53',
      //suffix: '_cal-customer-support',
      prompt: prompt,
      max_tokens: 1, // don't change
      n: 1,
      logprobs: 4, // number of classes
      temperature: 0.5 // Control the creativity of the generated responses
    });
  
    return completions.data.choices[0].text.trim();

  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data.error.code + ': ' + error.response.data.error.message);
    } else {
      console.log(error.message);
    }
  }

}



// Example usage:
const query = 'ה NFC לא עובד'+ ' \n\n###\n\n';

getChatbotResponse(query).then(response => {
  console.log('response:', response);
}).catch(error => {
  console.log('error:', error);
});

// results:
// 1 = ChangeCreditLimit
// 2 = BlockCard
// 3 = GoingAbroad
// 4 = SecretCode

