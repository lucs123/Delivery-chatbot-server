const express = require('express');
const router = express.Router();	
const pool = require('../db.js')

router.get('/',(req,res)=>{
	pool.query(('SELECT * FROM pedidos'), (err, results) => {
	  	if (err) {
	  	  throw err
	  	}
	  	// console.log(results.rows);
	  	res.send(results.rows)
		}
	)
})	

module.exports = router