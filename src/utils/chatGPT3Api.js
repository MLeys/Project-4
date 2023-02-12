// import { fetch } from 'https://deno.land/x/http/m
// NEED TO UPDATE openAI key. Was changed due to over activity
// if (process.env.NODE_ENV !== 'production') {
//   analytics.disable();
// }
// import dotenv from '../../dotenv';
// dotenv.config();
// import env from '../../env.js';

const API_KEY = window.OPENAI_API_KEY
// console.log(API_KEY,'<-API KEY')


// const API_KEY = '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'
import { Configuration, OpenAIApi } from 'openai'

export async function searchOpenAi(question) {
  try {

    const configuration = new Configuration({
        apiKey: API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        temperature: 0,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        
      });
      const data = response.data.choices[0].text
      return data

  } catch (error) {
    console.error(error);
  }
}
// const searchOpenAi = async (question) => {
//   try {

//     const configuration = new Configuration({
//         apiKey: API_KEY,
//       });
//       const openai = new OpenAIApi(configuration);
      
//       const response = await openai.createCompletion({
//         model: "text-davinci-003",
//         prompt: question,
//         temperature: 0,
//         max_tokens: 300,
//         top_p: 1,
//         frequency_penalty: 0.0,
//         presence_penalty: 0.0,
        
//       });
//       const data = response.data.choices[0].text
//       return data

//   } catch (error) {
//     console.error(error);
//   }
//};

// export { searchOpenAi };

      // console.log(response, "<______ RESPONSE")
      // console.log(response.data.choices[0].text)
//     const response = await fetch('https://api.openai.com/v1/engines/davinci', {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${API_KEY}`
//       }
//     });

//     if (!response.ok) {
//       throw new Error(response.statusText);
//     }

//     const data = await response.json();
//     console.log(data, "<________=== OPENAPI DATA")
//     const fullStackSkills = data.filter(item => item.includes("Full Stack Developer"));
//     const topSkills = fullStackSkills.slice(0, 10);
//     console.log(topSkills, "<<<<< TOP SKILLS")
//     return data;