const express = require('express');
const router = express.Router();
const order = require('../Bot.js')
const slugify = require('../slugify.js')


router.post('/',async (req,res)=>{
	// metodo para encontrar o contexto variavei pedido
	let context;
	// console.log(req.body.queryResult.outputContexts);
	req.body.queryResult.outputContexts.map(cont=>{
		if(cont.name.split('/')[cont.name.split('/').length - 1] === 'variaveis-pedido'){
			context = cont
		}
	})

	let contVariables = context.parameters
	// console.log(context)
	switch(req.body.queryResult.intent.displayName){
		case('Pedido'):
			const sabores_ = req.body.queryResult.parameters.sabor
			const quantidade = req.body.queryResult.parameters.number

			const sabores = sabores_.map(sabor=>(
			slugify(sabor)))
			
			res.send(order.orderResponse(sabores,quantidade))
			break;

		case('formaEntrega'):
			let valores = contVariables.valores;
			res.send(order.billingResponse(valores));
			break;

		case('entrega'):
			res.send(order.formaEntrega('entrega',req.body.queryResult.queryText, contVariables))
			break;

		case('retirada'):
			res.send(order.formaEntrega('retirada','Para retirada', contVariables))
			break;
		
		case('confirma-entrega'):
			let deliverMessage = await order.finishOrder('Obrigado, seu pedido será entregue', contVariables)
			res.send(deliverMessage)
			break;

		case('confirma-retirada'):
			let retrieveMessage = await order.finishOrder('Obrigado, seu pedido será preparado para retirada', contVariables)
			res.send(retrieveMessage)
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