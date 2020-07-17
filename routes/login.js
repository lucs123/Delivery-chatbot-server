const express = require('express');
const router = express.Router();

router.post('/',(req,res)=>{
	console.log(req.body)
	res.send({a:'received'})
})

module.exports = router