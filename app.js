require("dotenv").config();
const express = require("express");
let app = express()
const port = process.env.PORT || 3000;
const OpenAI = require("openai")
const cors = require("cors")
app.use(express.json())
app.use(cors())


const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY , // defaults to process.env["OPENAI_API_KEY"]
});

app.post("/chat",async(req,res)=>{
  let {message} = req.body
console.log(message)
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: 'user', content: message }],
    model: 'gpt-3.5-turbo',
  });


  res.json({"response":chatCompletion.choices[0].message.content});

})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
  