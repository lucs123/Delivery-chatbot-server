const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

app.get('/',(req,res)=>{
	res.send('Hello')
	console.log('live');
})

app.post('/',(req,res)=>{
	console.log(req.body);
	const sabores_ = req.body.queryResult.parameters.sabor
	const quantidade = req.body.queryResult.parameters.number
	console.log(quantidade);
	// console.log(order_response(sabores_,quantidade));
	if(req.body.queryResult.intent.displayName === 'Pedido'){
		res.send(order_response(sabores_,quantidade))
	}
	// console.log(sabores_);
	// console.log(quantidade);
	// if(sabores_.length > 2){
	// 	res.send(response('Desculpe só é possivel pedir até dois sabores'))
	// }
	const sabores = sabores_.map(sabor=>(
		slugify(sabor)))
	console.log(sabores);
	// console.log(req.body.queryResult.fulfillmentMessages.text);
	// console.log(req.body.queryResult.outputContexts[0]);
	// console.log(req.body.queryResult.outputContexts[1]);
	// console.log(req.body.queryResult.outputContexts[2]);
}
)

pedido = {
	id:'',
	pedido: '',
	valor: null 
}


function response(message){
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

function order_response(sabores,quantidade) {
	let res = "O seu pedido foi: "
	for (var i = sabores.length - 1; i >= 0; i--) {
		str = quantidade[i].toString()+' pizza '+sabores[i]+', '
		res = res.concat(str)
	}
	res = res + 'correto?(s/n)'
	return response(res)
}
		

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