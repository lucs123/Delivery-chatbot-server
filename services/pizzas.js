const menu = require('../data/pizzas.json') 
const {pedido} = require('../database')

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
            pedido.findAll({where:{id:id}})
            .then(response=>{
                const pedido_ = JSON.stringify(response[0], null, 2)
                const status = response[0].dataValues.status
                return status
            })
        }
        catch(err){
            console.log(err)
            return 'Não encontrado';              
        }
} 

exports.changeStatus = async data => {
         pedido.update({
            status:data.status }, {
        where: {
            id: data.id
            }
        }
        )
}

exports.create = async novoPedido => {
        const id = await pedido.max('id') + 1
        novoPedido.id = id

        pedido.create({
                    id : id,
                    pedido:novoPedido.pedido,
                    valor:novoPedido.valor,
                    formaentrega:novoPedido.formaentrega,
                    endereco:novoPedido.endereco,
                    status:novoPedido.status
        }).then(response=>{    
               return novoPedido 
        }).catch(err=>{
               return err 
        })
}

exports.delete = async id => {
        pedido.destroy({
        where: {
            id: req.params.id
        }
    })
}
