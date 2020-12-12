const io = require('../index.js').io;
const pedidos = require('./pedidos');

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  socket.on('changeStatus', (data)=>{
      pedidos.changeStatus(data.status, data.id)
    }
  )

  socket.on('remove', (data)=>{
      pedidos.delete(data.id)
    })

});
