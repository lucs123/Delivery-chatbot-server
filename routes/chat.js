const express = require('express');
const router = express.Router();
const order = require('../Bot.js')
const slugify = require('../slugify.js')
const basicAuth = require('express-basic-auth')

router.use(basicAuth({
    users: { 'admin': 'lkjgçajoiia' }
}))

function getContext(req) {
	// metodo para encontrar o contexto variaveis pedido
	let context;
	req.body.queryResult.outputContexts.map(cont=>{
		if(cont.name.split('/')[cont.name.split('/').length - 1] === 'variaveis-pedido'){
			context = cont
		}
	})
	return context.parameters	
}

router.post('/',async (req,res)=>{	

	switch(req.body.queryResult.intent.displayName){
		case('Pedido'):
			const sabores_ = req.body.queryResult.parameters.sabor
			const quantidade = req.body.queryResult.parameters.number

			const sabores = sabores_.map(sabor=>(
			slugify(sabor)))
			
			res.send(order.orderResponse(sabores,quantidade))
			break;

		case('formaEntrega'):
			let contVariables = await getContext(req)
			let valores = contVariables.valores;
			res.send(order.billingResponse(valores));
			break;

		case('entrega'):
			let contVariables = await getContext(req)
			res.send(order.formaEntrega('entrega',req.body.queryResult.queryText, contVariables))
			break;

		case('retirada'):
			let contVariables = await getContext(req)
			res.send(order.formaEntrega('retirada','Para retirada', contVariables))
			break;
		
		case('confirma-entrega'):
			let contVariables = await getContext(req)
			let deliverMessage = await order.finishOrder('Obrigado, seu pedido será entregue', contVariables)
			res.send(deliverMessage)
			break;

		case('confirma-retirada'):
			let contVariables = await getContext(req)
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
			res.send(pizzas)
			break;

		case('info_sabor'):
			const sabor = slugify(req.body.queryResult.parameters['sabor-pizza'])
			res.send(order.getInfo(sabor))
	}		
})


module.exports = router