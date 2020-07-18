const express = require('express');
const router = express.Router();
require('dotenv').config()
const pool = require('../db.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/', async (req,res)=>{
	console.log(req.body)
	
	const{rows} = await pool.query('SELECT * FROM users')
	const user = await rows[0]
	
	if(req.body.email !== user.email){
		return res.status(400).send({error:'Email inválido'})
	}
	
	const validPass = await bcrypt.compare(req.body.password, user.password)
	console.log(validPass)
	
	if(validPass){
		const token = jwt.sign({id_: user.id}, 
			process.env.TOKEN_SECRET)
		return res.header('auth-token', token).send({token:token})
	}

	else{		
		return res.status(400).send({error:'Senha inválida'})
	}	 
})


module.exports = router