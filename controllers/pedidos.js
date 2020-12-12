const pedidos = require('../services/pedidos');
const io = require('../index.js').io;

exports.getAll = async (req,res)=> {
    pedidos.getAll() 
    .then(response=>{
        const listaPedidos = JSON.stringify(response, null, 2)
        res.send(listaPedidos)
    })
    .catch(err=>{
        if(err.name==='SequelizeConnectionRefusedError'){
            res.status(500).send()    
        }
    })
}


exports.get = async (req,res)=> {
       pedidos.getPedido(req.params.id) 
        .then(response=>{
            (response[0])?
                res.send((JSON.stringify(response, null, 2))):
                res.status(404).send();
        }).catch(err=>{
            throw(err)
        })
    }

exports.create = async (req,res)=> {
        const novoPedido = req.body 

        pedidos.create(novoPedido)
        .then(response=>{    
                const pedidoCriado = response.dataValues
                const id = response.dataValues.id
                io.sockets.emit('FromAPI',pedidoCriado)
                res.set('Location', `pedidos/${id}`)     
                res.status(201).send(pedidoCriado)

        }).catch(err=>{
                res.status(400).send(err)
        })
    }

exports.update = async (req,res)=> {
            const pedidoAtualizado = req.body
            pedidos.update(pedidoAtualizado, req.params.id)
            .then(response=>{
                (response[0]===1)?
                    res.status(200).send(pedidoAtualizado):
                    res.status(404).send();
            }).catch(err=>{
                res.code(400).send(err)
            })
    }

exports.delete = async (req,res)=> {
        pedidos.delete(req.params.id)
        .then(response=>{
            (response===1)?
                res.status(200).send():
                res.status(404).send();
        }).catch(err=>{
            throw(err)
    })
    }

