const menu = require('./pizzas.json') 
const pool = require('./db.js')

//sabores disponiveis
available = []
for(let prop in menu){
    available.push(prop)
}

class Order {
    constructor(){
        this.sabores;
        this.quantidade;
        this.valores = [];
        this.pedido = {
                    id: null,
                    pedido: '',
                    valor: null,
                    formaentrega:'',
                    endereco:'',
                    status: '' 
                    };
    }

    getInfo = (sabor) => {
        const pizza = menu[sabor]
        console.log(pizza)
        return(this.textResponse('Pizza:'+pizza.Pizza+'; Ingredientes:'+pizza.Ingredientes+'; Preço:'+pizza.Preço))
    }

    getAllOptions = async ()=>{
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

                case('para retirada'):
                return(this.textResponse('Seu pedido já está aguardando a retirada'));              
            }
        }
        catch(err){
            return(this.textResponse('Desculpe, seu pedido não foi encontrado.'));              
        }

    }

    generateId = async () =>{
        const {rows} = await pool.query('SELECT MAX(id) FROM pedidos;')
        this.pedido.id = rows[0].max +1
    }

    orderResponse = () => {
        //generate id
        this.generateId()
        let res = "O seu pedido foi: "
        this.sabores.map((sabor,index)=>{
            //Para dois sabores
            if((sabor.includes(' e ') || sabor.includes(' com ')) && (!available.includes(sabor))){
                const sabor_ = sabor.split(' ')
                const sabor1 = menu[sabor_[0]]
                const sabor2 = menu[sabor_[sabor_.length - 1]] 
                let valor = Math.max(sabor1.Valor,sabor2.Valor)
                this.valores.push(valor)
                this.pedido.pedido = this.pedido.pedido.concat(this.quantidade[index].toString()
                    +' pizza '+sabor1.Pizza+' e '+sabor2.Pizza+', ')
                console.log(this.pedido.pedido,this.valores)    
            }
            //para um sabor
            else{
                let sabor_ = menu[sabor]
                this.valores.push(sabor_.Valor)
                this.pedido.pedido = this.pedido.pedido.concat(this.quantidade[index].toString()
                    +' pizza '+sabor_.Pizza+', ')   
            }
        })
        res = res.concat(this.pedido.pedido)
        res = res + 'correto?(s/n)'
        return (this.textResponse(res))
    }

    billingResponse = () => {
        let value = this.valores.reduce((a,b) => a+b,0)
        const formatter = new Intl.NumberFormat('pt-BR', 
                {
                  style: 'currency',
                  currency: 'BRL',
                });
        value = formatter.format(value)
        this.pedido.valor = value
        return (this.textResponse('O valor do pedido foi:'+value+', é para entrega ou retirada?'))
    }

    formaEntrega = (forma,endereco) =>{
        this.pedido.formaentrega = forma
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

    finishOrder= (message)=>{
        let params = []
        for(let prop in this.pedido){
            params.push(this.pedido[prop])
        }
        console.log(params);
        pool.query('INSERT INTO pedidos(id,pedido,valor,formaentrega,endereco,status) VALUES($1,$2,$3,$4,$5,$6)',params, 
            (err, res) => {
            if (err) {
                throw err
                }
        }
        )
        g_socket.emit('FromAPI',this.pedido)
        return (this.textResponse(message+' para consultar o status do seu pedido use o numero:'+this.pedido.id))
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
});


const getSocket = (socket) => {
    g_socket = socket
}

let order = new Order

module.exports = order