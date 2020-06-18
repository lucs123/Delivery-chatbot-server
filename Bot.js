const menu = require('./pizzas.json') 

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

module.exports = Order