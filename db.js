const Pool = require('pg').Pool

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// class Queries{
// 	constructor(){
// 		this.pedidos = []
// 	}
// 	insertNew = (params)=>{
// 		pool.query('INSERT INTO pedidos(pedido,valor,formaEntrega,endereco,status) VALUES($1,$2,$3,$4,$5)',params, 
// 			(err, res) => {
// 				if (err) {
// 			    	throw err
// 			  		}
// 			}
// 		)
// 	}	
// 	showAll = () => {
// 		console.log(process.env.DATABASE_URL)
// 		pool.query('SELECT * FROM pedidos;'
// 		 , (err, res) => {
// 	  	if (err) throw err;
// 	  	console.log(res.rows);
// 		});
// 	}
// 	getAll = async () => {
// 		await pool.query('SELECT * FROM pedidos;'
// 		 , (err, res) => {
// 	  	if (err) throw err;
// 	  	console.log('inside');
// 		});
// 	  	console.log('outside');
// 	}	
// }
// const queries = new Queries

// queries.showAll()

module.exports = pool

