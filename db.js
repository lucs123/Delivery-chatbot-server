const Pool = require('pg').Pool

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// console.log(process.env.DATABASE_URL)
// pool.query('SELECT * FROM pedidos;'
// 	 , (err, res) => {
//   if (err) throw err;
//   console.log(res.rows);
// });

module.exports = pool

