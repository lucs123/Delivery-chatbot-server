const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/',(req,res)=>{
	res.send('Hello')
	console.log('live');
})

app.post('/',(req,res)=>{
	console.log(req.body);
	res.send(response)
})

response = {
  "fulfillmentMessages": [
    {
      "text": {
        "text": [
          "Text response from webhook"
        ]
      }
    }
  ]
}

app.listen(PORT)