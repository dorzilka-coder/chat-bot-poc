const { OpenAIApi, Configuration } = require('openai');
const fs = require('fs');

// Set up OpenAI API credentials
const config = new Configuration({
  apiKey: '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'
})

const openai = new OpenAIApi(config);



async function uploadTrainingFileForFineTuning() {
  try {
    const res = await openai.createFile(fs.createReadStream("trainingData.jsonl"), "fine-tune");
    console.log('file uploaded! id = ', res.id);
  } catch (error) {
    console.log('ERRoR', error);
  }
}

async function fineTune(){
  let fineTuneReq = {
    training_file: 'file-xvnce6DE4rN2EgqEap0aaNCr',
    model: 'davinci',
    suffix: '_cal-customer-support'
  }
  try {
    const res = await openai.createFineTune(fineTuneReq);
    console.log('fine tuning done! status:', res.data.status);
  } catch (error) {
    console.log('ERRoR', error);
  }
}

async function followFineTune() {
  try {
    const res = await openai.retrieveFineTune('ft-VJrF3xhBQlgNKwMR9eKwCxGt');
    console.log('fine tuning retrieved! status:', res.data.status);
  } catch (error) {
    console.log('ERRoR', error);
  }
  
}

// Train the chatbot
// async function trainChatbot() {
//   const prompt = trainingData.map(data => `Q: ${data.query}\nA: ${data.response}\n`).join(''); // Construct prompt from training data

//   try {
//     const completions = await openai.createCompletion({
//       model: 'text-davinci-003',
//       suffix: '_cal-customer-support',
//       prompt: prompt,
//       max_tokens: 1024,
//       // n: 1,
//       // stop: ['\n'], // Stop generation at end of each answer
//       // temperature: 0.5 // Control the creativity of the generated responses
//     });

//     console.log(`Chatbot trained successfully!`, completions.data.choices[0].text);

//   } catch (error) {
//   if (error.response) {
//     console.log(error.response.status);
//     console.log(error.response.data);
//   } else {
//     console.log(error.message);
//   }
// }

// }

// Define training data
// const trainingData = [
//   {
//     query: 'היו לי הוצאות לא צפויות החודש, אתה יכול לעזור לי להגדיל את המסגרת?',
//     response: 'תוכל להגדיל את מסגרת האשראי שלך באמצעות אתר האינטרנט של כאל, בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אני צריך לבצע עסקה וכרגע נמצאים לי במסגרת 41 ש"ח',
//     response: 'ניתן להגדיל את מסגרת האשראי באמצעות אתר האינטרנט שלנו, בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אני חייבת לשנות את המסגרת אשראי שלי כמה שיותר מהר',
//     response: 'אפשר לשנות את מסגרת האשראי שלך באתר של כאל, בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אפשרי להגדיל מסגרת?',
//     response: 'אפשר להגדיל את מסגרת האשראי שלך באתר של כאל, בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אני רוצה להגדיל את מסגרת האשראי שלי ל 30 אלף ש"ח',
//     response: 'תוכל להגדיל את מסגרת האשראי שלך באתר שלנו בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'האם יש אפשרות להגדיל לי את המסגרת?',
//     response: 'אפשר להגדיל את מסגרת האשראי בדיגיטל. לשם כך יש לגלוש לכתובת הבאה: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'מתי תוגדל המסגרת אשראי?',
//     response: 'ניתן לקבל מידע לגבי מסגרת האשראי שלך בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'שלום, אני רוצה לפנות יותר מסגרת',
//     response: 'אפשר להגדיל את מסגרת האשראי שלך באתר של Cal, בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'יש מצב להרחיב לי את המסגרת?',
//     response: 'בכדי להרחיב את מסגרת האשראי שלך, בבקשה תיכנס לכתובת הבאה ותוכל לבצע זאת בעצמך: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אני מעוניין להגדיל את המסגרת או לבטל את הכרטיס',
//     response: 'אתה יכול לעדכן את גובה המסגרת שלך באתר שלנו , בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אני בחופשה בחול ומעוניין להגדיל מסגרת',
//     response: 'ניתן לבהצע הגדלת מסגרת גם מחו"ל באמצעות האתר, בכתובת הבאה: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'תבדוק לי אם אפשר מסגרת יותר גדולה',
//     response: 'לקבלת מידע לגבי הגדלת מסגרת האשראי וביצוע הגדלה של המסגרת ניתן לפנות לאתר כאל בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'כמה אני יכולה להגדיל את המסגרת של הכרטיס',
//     response: 'לקבלת מידע לגבי הגדלת מסגרת האשראי וביצוע הגדלה של המסגרת ניתן לפנות לאתר כאל בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'תעדכן לי מסגרת גדולה יותר',
//     response: 'תוכל לעדכן בעצמך את גובה מסגרת האשראי שלך בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'איך אפשר להגדיל את מסגרת הכרטיס?',
//     response: 'אפשר להגדיל את מסגרת האשראי של כרטיסך באתר שלנו , בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'הגעתי לגובה המסגרת שלי, מה אפשר לעשות?',
//     response: 'אפשר לנסות להגדיל את מסגרת האשראי שלך באמצעות הדיגיטל, בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'כמה יש לי במסגרת?',
//     response: 'ניתן לבדוק מהי המסגרת הנוכחית שלך באתר האינטרנט של Cal בכתובת הזאת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אני צריך עזרה בבקשה לעדכן את המסגרת אשראי',
//     response: 'ניתן לנסות ולהגדיל את מסגרת האשראי בקלות דרך האתר בכתובת: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'המסגרת של הכרטיס שלי קטנה מדי',
//     response: 'את יכולה להגדיל את המסגרת באמצעות האתר שלנו. לשם כך יש להיכנס לכתובת הבאה ולבצע את ההגדלה: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אני לא יכול להשתמש בכרטיס שלי כי חרגתי מהמסגרת',
//     response: 'יש באפשרותך לעדכן את מסגרת האשראי וכך תוכל לחזור ולהשתמש בכרטיסך. על מנת לעדכן את המסגרת, גש לכתובת הזאת באתר של כאל: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אי אפשר למשוך כסף מהחשבון כי עברתי את המסגרת. אני רוצה להגדיל את המסגרת או לבטל את הכרטיס',
//     response: 'אני מתנצל על אי הנוחות, אבל יש לך אפשרות להגדיל את מסגרת האשראי של כרטיסך בעצמך. כל מה שצריך זה להיכנס לאתר הבא ולבצע את ההגדלה: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'למה אי אפשר למשוך מזומן מהכספומט אם עברתי את המסגרת? זה ממש מעצבן! מה הקשר בכלל?',
//     response: 'אני מצטערת לשמוע על החוויה הלא נעימה שלך. לצערי לא ניתן למשוך כסף מזומן אם ניצלת את כל המסגרת של הכרטיס. הפתרון הוא הגדלת מסגרת האשראי בקלות ובמהירות באתר שלנו: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אני רוצה להקטין את המסגרת שלי ל-10000',
//     response: 'ניתן להקטין את מסגרת האשראי באתר. יש להיכנס לכתובת הבאה ולבצע את ההקטנה https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אני צריכה שהמסגרת תגיע ל- 1000 ולא יחרוג',
//     response: 'אין בעיה! על מנת לשנות את גובה מסגרת האשרא את צריכה לגלוש לאתר שלנו ושם לבצע את שינוי המסגרת. זאת הכתובת הישירה למסך עדכון מסגרת https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אני צריכה לשלם על הטיול הגדול שלי ואני חוששת שעם 34,000 אני לא אוכל',
//     response: 'אם מסגרת האשראי שנקבעה לך קטנה מדי, את יכולה לנסות ולהגדיל את המסגרת בקלות באמצעות אתר האינטרנט: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'אני רוצה לעלות את המסגרת אשראי',
//     response: 'אפשר להגדיל את גובה מסגרת האשראי שנקבעה לכרטיס באתר האינטרנט שלנו, בבקשה: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
//   {
//     query: 'החיוב בכרטיס יתבצע רק בעוד שבועיים וכבר נגמרה לי המסגרת. איך אני יכול להמשיך ולהשתמש בכרטיס?',
//     response: 'הפתרון יכול להיות הגדלת מסגרת האשראי בכרטיס. כל שעליך לעלות הוא להיכנס לאתר בכתובת הבאה ולהגדיל את מסגרת האשראי: https://www.cal-online.co.il/self-service/IncreaseCreditLimit/'
//   },
// ];


//uploadTrainingFileForFineTuning();
// fineTune();
followFineTune();

//trainChatbot();