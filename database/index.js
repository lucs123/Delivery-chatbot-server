require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
const Pedido = require('./models/pedido')
const sequelize = new Sequelize(process.env.CONNECTIONSTRING,{define:{
    timestamps:false,
    logging:false}});
// const Pedido = require('./model/pedido.js')(sequelize,DataTypes)
// const Pedido = sequelize.define('Pedido',{}, {tableName: 'pedidos'})
// Pedido.sync();
Pedido(sequelize)

// (async ()=>{
//     try{
//         // const id = await Pedido.max('id')
//         // console.log(id)
//         // const pedidos = await Pedido.findAll({order:['id']})
//         // console.log(pedidos)
//         // console.log(pedidos.every(pedido => pedido instanceof Pedido)); // true
//         // console.log(JSON.stringify(pedidos, null, 2));
//     }
//     catch(err){
//         alert(err)
//     }
// })()

module.exports = sequelize
