const { OpenAIApi, Configuration } = require('openai');
const fs = require('fs');

// Set up OpenAI API credentials
const config = new Configuration({
  apiKey: ''
})

const openai = new OpenAIApi(config);



async function uploadTrainingFileForFineTuning() {
  // categories for classification (ada model):
  // 1 = ChangeCreditLimit
  // 2 = BlockCard
  // 3 = GoingAbroad
  // 4 = SecretCode
  try {
    const res = await openai.createFile(fs.createReadStream("trainingData-classification.jsonl"), "fine-tune");
    console.log('file uploaded! training_file for fineTune = ', res.data.id);
  } catch (error) {
    console.log('ERRoR', error);
  }
}

async function fineTune(){
  let fineTuneReq = {
    training_file: 'file-kOtgKVPLBBZcSgELSKDNnWiS',
    model: 'ada',
    suffix: '_cal-customer-support-classification'
  }
  try {
    const res = await openai.createFineTune(fineTuneReq);
    console.log('fine tuning done! fine tuning id for followFineTune:', res.data.id);
  } catch (error) {
    console.log('ERRoR', error);
  }
}

async function followFineTune() {
  try {
    const res = await openai.retrieveFineTune('ft-P7XKRlN4llTBQ059JvB4WEiC');
    console.log('fine tuning retrieved! status:', res.data.status);
    if (res.data.status == 'succeeded') {
      console.log('customized model name for testing:', res.data.fine_tuned_model)
    }
  } catch (error) {
    console.log('ERRoR', error);
  }
  
}


//uploadTrainingFileForFineTuning();
//fineTune();
followFineTune();
