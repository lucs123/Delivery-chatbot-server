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

        // const novoPedido = {
        //     req.pedido,
        //     req.valor,
        //     req.formaentrega,
        //     req.endereco,
        //     req.status
        // };

        // let params = []
        // for(let prop in novoPedido){
        //     params.push(novoPedido[prop])
        // }
    pool.query('INSERT INTO pedidos(id,pedido,valor,formaentrega,endereco,status) VALUES($1,$2,$3,$4,$5,$6)',[
            id,
            req.pedido,
            req.valor,
            req.formaentrega,
            req.endereco,
            req.status], 
            (err, res) => {
            if (err) {
                throw err
                }
        }
        )
    })

router.put('/', (req, res)=>{

        pool.query('UPDATE pedidos\
            SET pedido=$2,\
            valor=$3,\
            formaentrega=$4,\
            endereco=$5,\
            status=$6,\
            WHERE id = $1',
            [req.params.id,
            req.pedido,
            req.valor,
            req.formaentrega,
            req.endereco,
            req.status],
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
