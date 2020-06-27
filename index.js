const express = require('express')
const app = express()
const http = require('http').createServer(app);
global.io = require('socket.io')(http);
const PORT = process.env.PORT || 5000
const slugify = require('./slugify.js')
const cors = require('cors')
const pedidos = require('./routes/pedidos.js')
const chat = require('./routes/chat.js')
const bot = require('./Bot.js')

app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
	res.send('Hello')
	console.log('live');
})

app.use('/pedidos',pedidos)
app.use('/chat',chat)


http.listen(PORT, () => {
  console.log('live');
});


