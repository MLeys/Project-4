// import { fetch } from 'https://deno.land/x/http/m
// NEED TO UPDATE openAI key. Was changed due to over activity

const API_KEY = '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'
import { Configuration, OpenAIApi } from 'openai'

const getSkills = async () => {
  try {

    const configuration = new Configuration({
        apiKey: API_KEY,
      });
      const openai = new OpenAIApi(configuration);
      
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "List top 50 full-stack development skills",
        temperature: 0,
        max_tokens: 300,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        
      });
      const data = response.data.choices[0].text
      return data
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
  } catch (error) {
    console.error(error);
  }
};

export { getSkills };
