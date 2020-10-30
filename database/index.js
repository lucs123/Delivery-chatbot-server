require('dotenv').config()
const { Sequelize, DataTypes } = require('sequelize');
// const Pedido = require('./models/pedido.model')
const sequelize = new Sequelize(process.env.CONNECTIONSTRING,{define:{
    timestamps:false,
    logging:false}});
exports.pedido = require('./models/pedido')(sequelize);
// (sequelize)
// const Pedido = sequelize.define('Pedido',{}, {tableName: 'pedidos'})
// Pedido(sequelize,DataTypes);
// Pedido.sync();

// (async ()=>{
//     try{
//         const id = await Pedido.max('id')
//         console.log(id)
//         const pedidos = await Pedido.findAll({order:['id']})
//         console.log(pedidos)
//         console.log(pedidos.every(pedido => pedido instanceof Pedido)); // true
//         console.log(JSON.stringify(pedidos, null, 2));
//     }
//     catch(err){
//         throw(err)
//     }
// })()

exports.sequelize = sequelize

