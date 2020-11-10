const menu = require('./data/pizzas.json') 

exports.getInfo = (sabor) => {
        const pizza = menu[sabor]
        return pizza
}

exports.getAllOptions = () =>{
        let pizzas = [];
        for(let prop in menu){
            pizzas = pizzas + menu[prop].Pizza+'; '
        }
        return pizzas
}

exports.getStatus = id => {
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
