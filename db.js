const Pool = require('pg').Pool
require('dotenv').config();
const pool = new Pool()

// class Queries{
// 	insert = (params) =>{
// 		pool.query('INSERT INTO pedidos(pedido,valor,formaEntrega,endereco,status) VALUES($1,$2,$3,$4,$5)',params, 
// 			(err, res) => {
// 			if (err) {
// 		    	throw err
// 		  		}
// 		}
// 		)
// 	}


// pool.query(('SELECT * FROM pedidos'), (err, res) => {
//   if (err) {
//     throw err
//   }
//   console.log(res.rows)
// }
// )

module.exports = pool

