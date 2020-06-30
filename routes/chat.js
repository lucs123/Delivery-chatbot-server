const express = require('express');
const router = express.Router();
const order = require('../Bot.js')
const slugify = require('../slugify.js')

router.post('/',async (req,res)=>{
	// console.log(req.body.queryResult.parameters['sabor-pizza']);
	switch(req.body.queryResult.intent.displayName){
		case('Pedido'):
			const sabores_ = req.body.queryResult.parameters.sabor
			const quantidade = req.body.queryResult.parameters.number

			const sabores = sabores_.map(sabor=>(
			slugify(sabor)))
			
			order.sabores = sabores
			order.quantidade = quantidade
			res.send(order.orderResponse())
			break;

		case('formaEntrega'):
			res.send(order.billingResponse());
			break;

		case('entrega'):
			console.log(req.body.queryResult.queryText)
			order.formaEntrega('entrega',req.body.queryResult.queryText)
			res.send(order.textResponse(
				'Deseja confirmar seu pedido de '+order.pedido.pedido+' no valor de '+order.pedido.valor+
				' para entrega em '+order.pedido.endereco+'?'))
			break;

		case('retirada'):
			order.formaEntrega('retirada','Para retirada')
			res.send(order.textResponse(
				'Deseja confirmar seu pedido de '+order.pedido.pedido+' no valor de '+order.pedido.valor+
				' para retirada?'))
			break;
		
		case('confirma-entrega'):
			order.pedido.status = 'Novo'
			res.send(order.finishOrder('Obrigado, seu pedido será entregue'))
			break;

		case('confirma-retirada'):
			order.pedido.status = 'Novo'
			res.send(order.finishOrder('Obrigado, seu pedido será preparado para retirada'))
			break;

		case('Status'):
			const id = req.body.queryResult.parameters.number;
			const status = await order.getStatus(id)
			res.send(status);
			break;

		case('pizzas'):
			order.getAllOptions()
			const pizzas = await order.getAllOptions()
			// console.log(pizzas.fulfillmentMessages[0].text)
			res.send(pizzas)
			break;

		case('info_sabor'):
			const sabor = slugify(req.body.queryResult.parameters['sabor-pizza'])
			res.send(order.getInfo(sabor))
	}		
})


module.exports = router