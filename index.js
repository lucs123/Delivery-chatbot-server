const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

const menu = require('./pizzas.json') 

app.use(express.json())

app.get('/',(req,res)=>{
	res.send('Hello')
	console.log('live');
})

class Order {
	constructor(sabores,quantidade){
		this.sabores = sabores;
		this.quantidade = quantidade;
		this.pizzas = [];
		this.pedido = {
					id:'',
					pedido: '',
					valor: null,
					formaEntrega:'',
					endereco:'',
					status: '' 
					};
	}

	orderResponse = () => {
		let res = "O seu pedido foi: "
		for (var i = this.sabores.length - 1; i >= 0; i--) {
			let sabor = menu[this.sabores[i]]	
			this.pizzas.push(sabor)
			let str = this.quantidade[i].toString()+' pizza '+sabor.Pizza+', '
			this.pedido.pedido = this.pedido.pedido.concat(str)
			res = res.concat(str)
		}
		res = res + 'correto?(s/n)'
		return (this.textResponse(res))
	}

	billingResponse = () => {
		let value = 0
		for (var i = this.pizzas.length - 1; i >= 0; i--) {
			value = value + this.pizzas[i].Valor
		}
		this.pedido.valor = value
		let formatter = new Intl.NumberFormat('pt-BR', 
				{
				  style: 'currency',
				  currency: 'BRL',
				});
		value = formatter.format(value)
		this.pedido.valor = value
		return (this.textResponse('O valor do pedido foi:'+value+', é para entrega ou retirada?'))
	}

	formaEntrega = (forma,endereco) =>{
		this.pedido.formaEntrega = forma
		this.pedido.endereco = endereco
	}

	textResponse = (message)=>{
	return(
	{
	  "fulfillmentMessages": [
	    {
	      "text": {
	        "text": [
	          message
	        ]
	      }
	    }
	  ]
	})}
}

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


function slugify (str) {
    var map = {
        '-' : ' ',
        '-' : '_',
        'a' : 'á|à|ã|â|À|Á|Ã|Â',
        'e' : 'é|è|ê|É|È|Ê',
        'i' : 'í|ì|î|Í|Ì|Î',
        'o' : 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
        'u' : 'ú|ù|û|ü|Ú|Ù|Û|Ü',
        'c' : 'ç|Ç',
        'n' : 'ñ|Ñ'
    };
    
    str = str.toLowerCase();
    
    for (var pattern in map) {
        str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };

    return str;
};



app.listen(PORT)