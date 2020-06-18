const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
const Order = require('./Bot.js')
const slugify = require('./slugify.js')


app.use(express.json())

app.get('/',(req,res)=>{
	res.send('Hello')
	console.log('live');
})

app.post('/',(req,res)=>{
	console.log(req.body);
	if(req.body.queryResult.intent.displayName === 'Pedido'){
		const sabores_ = req.body.queryResult.parameters.sabor
		const quantidade = req.body.queryResult.parameters.number

		const sabores = sabores_.map(sabor=>(
		slugify(sabor)))
		
		order = new Order(sabores,quantidade) 
		res.send(order.orderResponse())
	}
	if(req.body.queryResult.intent.displayName === 'formaEntrega'){
		res.send(order.billingResponse())
		console.log(order.pedido);
	}

	if(req.body.queryResult.intent.displayName === 'entrega'){
		order.formaEntrega('entrega',req.body.queryResult.parameters.endereco)
		res.send(order.textResponse(
			'Deseja confirmar seu pedido de '+order.pedido.pedido+' no valor de '+order.pedido.valor+
			' para entrega em '+order.pedido.endereco+'?'))
	}
	if(req.body.queryResult.intent.displayName === 'retirada'){
		order.formaEntrega('retirada','')
		res.send(order.textResponse(
			'Deseja confirmar seu pedido de '+order.pedido.pedido+' no valor de '+order.pedido.valor+
			' para retirada?'))
		console.log(order.pedido);
	}
	if(req.body.queryResult.intent.displayName === 'confirma-entrega'){
		order.pedido.status = 'na fila'
		console.log(order.pedido);
		res.send(order.textResponse('Obrigado, seu pedido será entregue'))
	}
	if(req.body.queryResult.intent.displayName === 'confirma-retirada'){
		order.pedido.status = 'na fila'
		order.pedido.status = 'para retirada'
		console.log(order.pedido);
		res.send(order.textResponse('Obrigado, seu pedido será entregue'))
	}		
})


app.listen(PORT)