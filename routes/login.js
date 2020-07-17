const express = require('express');
const router = express.Router();
const pool = require('../db.js')
const bcrypt = require('bcryptjs')

router.post('/', async (req,res)=>{
	console.log(req.body)
	
	const{rows} = await pool.query('SELECT * FROM users')
	const user = await rows[0]
	console.log(user)
	
	if(req.body.email !== user.email){
		return res.status(400).send({error:'Email inválido'})
	}
	
	const validPass = await bcrypt.compare(req.body.password, user.password)
	console.log(validPass)
	
	if(validPass){
		return res.send({user:true})
	}

	else{		
		return res.status(400).send({error:'Senha inválida'})
	}	 
})


module.exports = router