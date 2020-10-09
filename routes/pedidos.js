const express = require('express');
const router = express.Router();	
const Pedido = require('../db.js');
const {response} = require('express');

router.get('/',async (req,res)=>{
    try{
        const pedidos = await Pedido.findAll({order:['id']})
        const listaPedidos = (JSON.stringify(pedidos, null, 2));
        res.send(listaPedidos)
    }
    catch(err){
        alert(err)
    }
})	

router.get('/:id',async (req,res)=>{
    try{
        const pedido = await Pedido.findAll({where:{id:req.params.id}})
        res.send((JSON.stringify(pedido, null, 2)));
    }
    catch(err){
        alert(err)
    }
})	

router.post('/', async (req, res)=>{

        const id = await Pedido.max('id') + 1
        console.log(id)
        const novoPedido = req.body 
        novoPedido.id = id
        try{
            const inserirPedido = await Pedido.create({
                    id : id,
                    pedido:novoPedido.pedido,
                    valor:novoPedido.valor,
                    formaentrega:novoPedido.formaentrega,
                    endereco:novoPedido.endereco,
                    status:novoPedido.status
            })    
                res.set('Location', `pedidos/${id}`)     
                res.status(201).send(novoPedido)
        }
        catch(err){
            throw err
        }

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
                console.log(response);
                (response[0]===1)?
                    res.status(200).send(pedidoAtualizado):
                    res.status(404).send();
            }).catch(err=>{
                console.log(err)
            })
    }
) 

router.delete('/:id', async (req, res)=>{
        Pedido.destroy({
        where: {
            id: req.params.id
        }
        }).then(response=>{
            console.log(response);
            (response===1)?
                res.status(200).send():
                res.status(404).send();
        }).catch(err=>{
            throw(err)
    })

});


module.exports = router;
