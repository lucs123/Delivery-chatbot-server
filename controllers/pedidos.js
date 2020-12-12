const {pedido} = require('../database');

exports.getAll = async (req,res)=> {
    try{
        const pedidos = await pedido.findAll({order:['id']})
        const listaPedidos = (JSON.stringify(pedidos, null, 2));
        res.send(listaPedidos)
    }
    catch(err){
        if(err.name==='SequelizeConnectionRefusedError'){
            res.status(500).send()
        }
    }
}

exports.get = async (req,res)=> {
        pedido.findAll({where:{id:req.params.id}})
        .then(response=>{
            (response[0])?
                res.send((JSON.stringify(response, null, 2))):
                res.status(404).send();
        }).catch(err=>{
            throw(err)
        })
    }

exports.create = async (req,res)=> {
        const id = await pedido.max('id') + 1
        const novoPedido = req.body 
        novoPedido.id = id
        pedido.create({
                    id : id,
                    pedido:novoPedido.pedido,
                    valor:novoPedido.valor,
                    formaentrega:novoPedido.formaentrega,
                    endereco:novoPedido.endereco,
                    status:novoPedido.status
        }).then(response=>{    
                res.set('Location', `pedidos/${id}`)     
                res.status(201).send(novoPedido)
        }).catch(err=>{
                res.status(400).send(err)
        })
    }

exports.update = async (req,res)=> {
        const pedidoAtualizado = req.body
         pedido.update({
            pedido:pedidoAtualizado.pedido,
            valor:pedidoAtualizado.valor,
            formaentrega:pedidoAtualizado.formaentrega,
            endereco:pedidoAtualizado.endereco,
            status:pedidoAtualizado.status }, {
        where: {
            id: req.params.id
            }
            }).then(response=>{
                (response[0]===1)?
                    res.status(200).send(pedidoAtualizado):
                    res.status(404).send();
            }).catch(err=>{
                res.code(400).send(err)
            })
    }

exports.delete = async (req,res)=> {
        pedido.destroy({
        where: {
            id: req.params.id
        }
        }).then(response=>{
            (response===1)?
                res.status(200).send():
                res.status(404).send();
        }).catch(err=>{
            throw(err)
    })
    }

