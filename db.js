require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.CONNECTIONSTRING,{define:{timestamps:false}}); // Example for postgres
const Pedido = require('./model/pedidos.js')(sequelize,DataTypes)
// const Pedido = sequelize.define('Pedido',{}, {tableName: 'pedidos'})
Pedido.sync();

// (async ()=>{
//     try{
//         const pedidos = await Pedido.findAll()
//         // console.log(pedidos)
//         // console.log(pedidos.every(pedido => pedido instanceof Pedido)); // true
//         console.log("All users:", JSON.stringify(pedidos, null, 2));
//     }
//     catch(err){
//         alert(err)
//     }
// })()
