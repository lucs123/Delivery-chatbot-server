const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://lucas:jpx@localhost:5432/delivery'); // Example for postgres

const Pedido = sequelize.define('Pedido',{}, {tableName: 'pedidos'})
Pedido.sync();
// console.log(Pedido)

// (async ()=>{
//     const pedidos = await Pedido.findAll()
//     console.log(pedidos)
//     // console.log(pedidos.every(pedido => pedido instanceof Pedido)); // true
//     // console.log("All users:", JSON.stringify(pedidos, null, 2));
// })()
