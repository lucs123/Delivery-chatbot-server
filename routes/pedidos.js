const express = require('express');
const router = express.Router();	
// const Pedido = require('../db.js');
const Pedido = require('../model/pedido.js');
const {response} = require('express');

console.log(Pedido)
router.get('/',async (req,res)=>{
    try{
        const pedidos = await Pedido.findAll({order:['id']})
        const listaPedidos = (JSON.stringify(pedidos, null, 2));
        res.send(listaPedidos)
    }
    catch(err){
        if(err.name==='SequelizeConnectionRefusedError'){
            res.status(500).send()
        }
    }
})	

router.get('/:id',async (req,res)=>{
        Pedido.findAll({where:{id:req.params.id}})
        .then(response=>{
            (response[0])?
                res.send((JSON.stringify(response, null, 2))):
                res.status(404).send();
        }).catch(err=>{
            throw(err)
        })
})	

router.post('/', async (req, res)=>{

        const id = await Pedido.max('id') + 1
        const novoPedido = req.body 
        novoPedido.id = id
        Pedido.create({
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
                res.code(400).send(err)
        })
})

router.put('/:id', async (req, res)=>{
        const pedidoAtualizado = req.body

         Pedido.update({
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
) 

router.delete('/:id', async (req, res)=>{
        Pedido.destroy({
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

});


module.exports = router;
