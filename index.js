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
					status: '' 
					};
	}

	orderResponse = () => {
		let res = "O seu pedido foi: "
		for (var i = this.sabores.length - 1; i >= 0; i--) {
			let sabor = menu[this.sabores[i]]	
			this.pizzas.push(sabor)
			let str = this.quantidade[i].toString()+' pizza '+sabor.Pizza+', '
			res = res.concat(str)
		}
		res = res + 'correto?(s/n)'
		this.pedido.pedido = res
		return (this.textResponse(res))
	}

	billingResponse = () => {
		let value = 0
		for (var i = this.pizzas.length - 1; i >= 0; i--) {
			value = value + this.pizzas[i].Valor
		}
		let formatter = new Intl.NumberFormat('pt-BR', 
				{
				  style: 'currency',
				  currency: 'BRL',
				});
		return (this.textResponse('O valor do pedido foi:'+formatter.format(value)+', é para entrega ou retirada?'))
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
	// console.log(order_response(sabores_,quantidade));
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
	}
}
)

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