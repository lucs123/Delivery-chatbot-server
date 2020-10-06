const express = require('express');
const router = express.Router();	
const pool = require('../db.js')

router.get('/',(req,res)=>{
	pool.query(('SELECT * FROM pedidos'), (err, results) => {
	  	if (err) {
	  	  throw err
	  	}
	  	// console.log(results.rows);
	  	res.send(results.rows)
		}
	)
})	

router.post('/', (req, res)=>{
        const {rows} = await pool.query('SELECT MAX(id) FROM pedidos;')
        const id = rows[0].max +1

        const novoPedido = {
            id: id,
            pedido: req.pedido,
            valor: req.valor,
            formaentrega: req.formaentrega,
            endereco: req.endereco,
            status: req.status
        };

        let params = []
        for(let prop in novoPedido){
            params.push(novoPedido[prop])
        }
        pool.query('INSERT INTO pedidos(id,pedido,valor,formaentrega,endereco,status) VALUES($1,$2,$3,$4,$5,$6)',params, 
            (err, res) => {
            if (err) {
                throw err
                }
        }
        )
    })

router.put('/', (req, res)=>{
        const pedido = {
            id: id,
            pedido: req.pedido,
            valor: req.valor,
            formaentrega: req.formaentrega,
            endereco: req.endereco,
            status: req.status
        };

        pool.query('UPDATE pedidos\
            SET status=$1\
            WHERE id = $2',[data.status, req.params.id],
            (err, res) => {
                if (err) {
                    throw err
                }
        })
}) 

router.delete('/', (req, res)=>{
    pool.query('DELETE FROM pedidos\
        WHERE id = $1;',[req.params.id],
        (err, res) => {
            if (err) {
                throw err
            }
        })
});


module.exports = router;
