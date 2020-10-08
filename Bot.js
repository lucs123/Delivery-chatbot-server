const menu = require('./pizzas.json') 
const pool = require('./db.js')
const io = require('./index.js').io;

//sabores disponiveis
available = []
for(let prop in menu){
    available.push(prop)
}

class Order {
    
    getInfo = (sabor) => {
        const pizza = menu[sabor]
        console.log(pizza)
        return(this.textResponse('Pizza:'+pizza.Pizza+'; Ingredientes:'+pizza.Ingredientes+'; Preço:'+pizza.Preço))
    }

    getAllOptions = ()=>{
        let pizzas = [];
        for(let prop in menu){
            pizzas = pizzas + menu[prop].Pizza+'; '
        }
        return(this.textResponse(pizzas)) 
    }

    getStatus = async (id) =>{
        try{
            const {rows} = await pool.query('SELECT status FROM pedidos\
                WHERE id=$1;',[id])
            const status_ = await rows[0].status

            switch(status_){
                case('Novo'):
                return(this.textResponse('Seu pedido está na fila de espera'));              

                case('Fazendo'):
                return(this.textResponse('Seu pedido está na sendo preparado'));              

                case('Para entrega'):
                return(this.textResponse('Seu pedido já será entregue'));              

                case('Aguardando retirada'):
                return(this.textResponse('Seu pedido já está aguardando a retirada'));              
            }
        }
        catch(err){
            return(this.textResponse('Desculpe, seu pedido não foi encontrado.'));              
        }

    }

    generateId = async () =>{
        const {rows} = await pool.query('SELECT MAX(id) FROM pedidos;')
        return rows[0].max +1
    }

    orderResponse = (sabores,quantidade) => {
        //generate id
        this.generateId()
        let pedido = '';
        let valores =[];
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
        const id = await this.generateId()

        const novoPedido = {
            id: id,
            pedido: pedido,
            valor: context.valor,
            formaentrega: context.formaentrega,
            endereco: context.endereco,
            status: 'Novo' 
        };
        let params = []
        for(let prop in novoPedido){
            params.push(novoPedido[prop])
        }
        pool.query('INSERT INTO pedidos(id,pedido,valor,formaentrega,endereco,status) VALUES($1,$2,$3,$4,$5,$6)',params, 
            (err, res) => {
            if (err) {
                throw err
                }
        }
        )
        console.log(novoPedido)
        if(g_socket){g_socket.emit('FromAPI',novoPedido)}
        return (this.textResponse(message+' para consultar o status do seu pedido use o numero:'+id))
    }

}

let g_socket;

io.on("connection", (socket) => {
  console.log("New client connected");
  getSocket(socket)
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
  socket.on('changeStatus', (data)=>{
    // console.log(data)
    pool.query('UPDATE pedidos\
        SET status=$1\
        WHERE id = $2',[data.status,data.id],
        (err, res) => {
            if (err) {
                throw err
            }
        })
    }
    )
  socket.on('remove', (data)=>{
    console.log(data)
    pool.query('DELETE FROM pedidos\
        WHERE id = $1;',[data.id],
        (err, res) => {
            if (err) {
                throw err
            }
        })
    })
});


const getSocket = (socket) => {
    g_socket = socket
}

const order = new Order

module.exports = order
