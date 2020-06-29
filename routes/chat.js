const express = require('express');
const router = express.Router();
const Order = require('../Bot.js')
const slugify = require('../slugify.js')

router.post('/',(req,res)=>{
	// console.log(req.body);
	switch(req.body.queryResult.intent.displayName){
		case('Pedido'):
			const sabores_ = req.body.queryResult.parameters.sabor
			const quantidade = req.body.queryResult.parameters.number

			const sabores = sabores_.map(sabor=>(
			slugify(sabor)))
			
			order = new Order(sabores,quantidade) 
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
			order.formaEntrega('retirada','')
			res.send(order.textResponse(
				'Deseja confirmar seu pedido de '+order.pedido.pedido+' no valor de '+order.pedido.valor+
				' para retirada?'))
			break;
		
		case('confirma-entrega'):
			order.pedido.status = 'na fila'
			res.send(order.finishOrder('Obrigado, seu pedido será entregue'))
			break;

		case('confirma-retirada'):
			order.pedido.status = 'na fila'
			order.pedido.status = 'para retirada'
			res.send(order.finishOrder('Obrigado, seu pedido será preparado para retirada'))
			break;

		// case('Status'):
		// 	const id = req.body.queryResult.parameters.number;
		// 	order.getStatus(id);
	}		
})


module.exports = router