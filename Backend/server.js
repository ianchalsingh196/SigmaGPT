import express from 'express';
import "dotenv/config";
import cors from 'cors';


const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.post("/test", async (req, res) => {
  const options = {
    method: "POST",
    headers : {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "openrouter/free",
      messages: [{ 
        role: "user", 
        content: req.body.message 
      }]
    })
  }

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", options);
    const data = await response.json();
    // console.log(data.choices[0].message.content);
    res.send(data.choices[0].message.content);
  } catch (error) {
    console.log(error);
  }
})








// import OpenAI from 'openai';
// import 'dotenv/config';

// const client = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const response = await client.chat.completions.create({
//   model: 'openrouter/free',
//   messages: [
//     { role: 'user', content: 'Joke related to programming' }
//   ],
// });

// console.log(response.choices[0].message.content);