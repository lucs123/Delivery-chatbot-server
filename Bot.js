const menu = require('./data/pizzas.json') 
const io = require('./index.js').io;
const pizzas = require('./services/pizzas')
const pedidos = require('./services/pedidos');

class Order {
    getInfo = (sabor) => {
        const pizza = pizzas.getInfo(sabor)
        return(this.textResponse('Pizza:'+pizza.Pizza+'; Ingredientes:'+pizza.Ingredientes+'; Preço:'+pizza.Preço))
    }

    getAllOptions = ()=>{
        const listaPizzas = pizzas.getAllOptions()
        return(this.textResponse(listaPizzas)) 
    }

    getStatus = async (id) =>{
            const status = await pedidos.getStatus(id)

            switch(status){
                case('Novo'):
                return(this.textResponse('Seu pedido está na fila de espera'));              

                case('Fazendo'):
                return(this.textResponse('Seu pedido está na sendo preparado'));              

                case('Para entrega'):
                return(this.textResponse('Seu pedido já será entregue'));              

                case('Aguardando retirada'):
                return(this.textResponse('Seu pedido já está aguardando a retirada'));              

                case('Não encontrado'):
                return(this.textResponse('Desculpe, seu pedido não foi encontrado.'));              
            }
    }

    orderResponse = (sabores,quantidade) => {
        let pedido = '';
        let valores =[];
        const available = pizzas.getAllOptions()
        let res = "O seu pedido foi: "

        sabores.map((sabor,index)=>{
            //Para dois sabores
            if((sabor.includes(' e ') || sabor.includes(' com ')) && (!available.includes(sabor))){
                const sabor_ = sabor.split(' ')
                const sabor1 = menu[sabor_[0]]
                const sabor2 = menu[sabor_[sabor_.length - 1]] 
                let valor = Math.max(sabor1.Valor,sabor2.Valor)
                valores.push(valor)
                pedido = pedido.concat(quantidade[index].toString()
                    +' pizza '+sabor1.Pizza+' e '+sabor2.Pizza+', ')
                console.log(pedido,valores)    
            }
            //para um sabor
            else{
                let sabor_ = menu[sabor]
                valores.push(sabor_.Valor)
                pedido = pedido.concat(quantidade[index].toString()
                    +' pizza '+sabor_.Pizza+', ')   
            }
        })
        res = res.concat(pedido)
        res = res + 'correto?(s/n)'
        return (this.contextResponse(res,{pedido: pedido, valores: valores}))
    }

    billingResponse = (valores) => {
        let valor = valores.reduce((a,b) => a+b,0)
        const formatter = new Intl.NumberFormat('pt-BR', 
                {
                  style: 'currency',
                  currency: 'BRL',
                });
        valor = formatter.format(valor)
        return (this.contextResponse('O valor do pedido foi:'+valor+', é para entrega ou retirada?',{valor: valor}))
    }

    formaEntrega = (forma,endereco,context) =>{
        let message;
        if (forma === 'entrega'){
            message = 'Deseja confirmar seu pedido de '+context.pedido+' no valor de '+context.valor+
                ' para entrega em '+endereco+'?' 
        }
        else{       
            message = 'Deseja confirmar seu pedido de '+context.pedido+
                ' no valor de '+context.valor+' para retirada?' 
        }
        return(order.contextResponse(message, {endereco: endereco, formaentrega: forma}))
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

    contextResponse = (message,context)=>{
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
                  ],
                  "outputContexts": [
                    {
                      "name": "projects/newagent-cevc/agent/sessions/167c9305-b03d-5d92-0809-bc2373f7ea5b/contexts/variaveis-pedido",
                      "lifespanCount": 5,
                      "parameters": context
                    }
            ]
        }
        )
    }

    finishOrder= async (message, context)=>{
        //remove last space and comma
        const pedido = context.pedido.slice(0, -2)

        const novoPedido = {
            pedido: pedido,
            valor: context.valor,
            formaentrega: context.formaentrega,
            endereco: context.endereco,
            status: 'Novo' 
        };

        return pedidos.create(novoPedido)
            .then(response=>{
                const pedidoCriado = response.dataValues
                const id = response.dataValues.id
                io.sockets.emit('FromAPI',pedidoCriado)
                return (this.textResponse(message +' para consultar o status do seu pedido use o numero:'+ id))
            })
    }
}

const order = new Order

module.exports = order
