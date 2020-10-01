const express = require('express');
const router = express.Router();
require('dotenv').config()
const pool = require('../db.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

router.post('/', async (req,res)=>{
	const{rows} = await pool.query('SELECT * FROM users')
	const user = await rows[0]
	
	if(req.body.email !== user.email){
		return res.status(400).send({auth:false, error:'Email inválido'})
	}
	
	const validPass = await bcrypt.compare(req.body.password, user.password)
	
	if(validPass){
		const token = jwt.sign({id_: user.id}, 
			process.env.TOKEN_SECRET)
		return res.send({auth:true, token:token})
	}

	else{		
		return res.status(400).send({auth:false, error:'Senha inválida'})
	}	 
})

router.post('/auth', (req,res)=>{
	let token = req.body.token

	if (!token) 
        return res.status(401).send({ auth: false, message: 'Token não informado.' }); 
    
    jwt.verify(token, process.env.TOKEN_SECRET, function(err, decoded) { 
    if (err) {
        return res.status(500).send({ auth: false, message: 'Token inválido.' }); 
    }    

    return res.send({auth:true, message: 'Token recebido'})
	})
})

module.exports = router