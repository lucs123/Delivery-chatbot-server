const express = require('express');
const router = express.Router();	
const {pedido} = require('../database');
const {response} = require('express');

router.get('/',async (req,res)=>{
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
})	

router.get('/:id',async (req,res)=>{
        pedido.findAll({where:{id:req.params.id}})
        .then(response=>{
            (response[0])?
                res.send((JSON.stringify(response, null, 2))):
                res.status(404).send();
        }).catch(err=>{
            throw(err)
        })
})	

router.post('/', async (req, res)=>{

        const id = await pedido.max('id') + 1
        const novoPedido = req.body 
        novoPedido.id = id
        pedido.create({
                    id : id,
                    pedido:novopedido.pedido,
                    valor:novopedido.valor,
                    formaentrega:novopedido.formaentrega,
                    endereco:novopedido.endereco,
                    status:novopedido.status
        }).then(response=>{    
                res.set('Location', `pedidos/${id}`)     
                res.status(201).send(novopedido)
        }).catch(err=>{
                res.code(400).send(err)
        })
})

router.put('/:id', async (req, res)=>{
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
) 

router.delete('/:id', async (req, res)=>{
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

});


module.exports = router;
