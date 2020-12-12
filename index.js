const express = require('express')
const app = express()
const path = require('path')
const http = require('http').createServer(app);
const io = exports.io = require('socket.io')(http);
const PORT = process.env.PORT || 5000
const cors = require('cors')
const pedidos = require('./routes/pedidos.js')
const chat = require('./routes/chat.js')
const login = require('./routes/login.js')
require('./database')
require('./services/socket')

app.use(express.urlencoded({extended:true})) 
app.use(express.json())

app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
  (err) => {
    if (err) {
      res.status(500).send(err)
    }
	}
});


app.use('/login',login)
app.use('/pedidos',pedidos)
app.use('/chat',chat)


http.listen(PORT, () => {
  console.log('live');
});

