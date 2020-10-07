const express = require('express');
const router = express.Router();	
const pool = require('../db.js')

router.get('/',(req,res)=>{
	pool.query(('SELECT * FROM pedidos\
        ORDER BY id'), (err, results) => {
	  	if (err) {
	  	  throw err
	  	}
	  	res.send(results.rows)
		}
	)
})	

router.get('/:id',(req,res)=>{
	pool.query(('SELECT FROM pedidos\
        WHERE id=$1'), [req.params.id], (err, results) => {
	  	if (err) {
	  	  throw err
	  	}
	  	res.send(results.rows)
		}
	)
})	

router.post('/', async (req, res)=>{
        const {rows} = await pool.query('SELECT MAX(id) FROM pedidos;')
        const id = rows[0].max +1
    
        const novoPedido = req.body 
        novoPedido.id = id
        pool.query('INSERT INTO pedidos(id,pedido,valor,formaentrega,endereco,status) VALUES($1,$2,$3,$4,$5,$6)',[
             id,
            novoPedido.pedido,
            novoPedido.valor,
            novoPedido.formaentrega,
            novoPedido.endereco,
            novoPedido.status],
             (err, response) => {
             if (err) {
                 throw err
                 }
            res.status(201).send(novoPedido)
         }
         )
    })

router.put('/:id', async (req, res)=>{
        const pedidoAtualizado = req.body
        pool.query('UPDATE pedidos\
            SET pedido=$2,\
            valor=$3,\
            formaentrega=$4,\
            endereco=$5,\
            status=$6\
            WHERE id = $1',
            [req.params.id,
            pedidoAtualizado.pedido,
            pedidoAtualizado.valor,
            pedidoAtualizado.formaentrega,
            pedidoAtualizado.endereco,
            pedidoAtualizado.status],
            (err, response) => {
                if (err) {
                    throw err
                }
        })

}) 

router.delete('/:id', async (req, res)=>{
    pool.query('DELETE FROM pedidos\
        WHERE id = $1;',[req.params.id],
        (err, res) => {
            if (err) {
                throw err
            }
        })
});


module.exports = router;
