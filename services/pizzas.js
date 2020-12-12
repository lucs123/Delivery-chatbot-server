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

exports.getAll = async () => {
        return pedido.findAll({order:['id']})
}

exports.getPedido = async id => {
        return pedido.findAll({where:{id:id}})
}

exports.getStatus = async id => {
            return pedido.findAll({where:{id:id}})
            .then(response=>{
                const pedido_ = JSON.stringify(response[0], null, 2)
                const status = response[0].dataValues.status
                console.log(status)
                return status
                }).catch(err =>{
            console.log(err)
            return 'Não encontrado';
        })
} 

exports.changeStatus = async (status, id) => {
        return pedido.update({
            status:status }, {
        where: {
            id: id
            }
        }
        )
}

exports.create = async novoPedido => {
        const id = await pedido.max('id') + 1
        novoPedido.id = id

        return pedido.create({
                    id : id,
                    pedido:novoPedido.pedido,
                    valor:novoPedido.valor,
                    formaentrega:novoPedido.formaentrega,
                    endereco:novoPedido.endereco,
                    status:novoPedido.status
        })
}

exports.update = (pedidoAtualizado, id) => {
        return pedido.update({
            pedido:pedidoAtualizado.pedido,
            valor:pedidoAtualizado.valor,
            formaentrega:pedidoAtualizado.formaentrega,
            endereco:pedidoAtualizado.endereco,
            status:pedidoAtualizado.status }, {
        where: {
            id: id
            }
        })
}

exports.delete = async id => {
        return pedido.destroy({
        where: {
            id: id
        }
    })
}
