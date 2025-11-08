const express = require('express')
const mysql = require('mysql2');
const app = express()
const port = 3000
//SELECT `id`, `email`, `password` FROM `usuarios` WHERE 1
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'meli',
});



app.get('/login', async (req, res) => {
    const { email, password } = req.query
    const [rows] = await pool.promise()
        .query('SELECT `id`, `email`, `password` FROM `usuarios` WHERE email = ? AND password = ?', [email, password]);

    if (rows.length > 0) {
        res.send('login successful')
    } else {
        res.send('invalid credentials')
    }
})

app.get('/register', async (req, res) => {
    const { email, password } = req.query
    const [rows] = await pool.promise()
        .query('INSERT INTO `usuarios` (`email`, `password`) VALUES (?, ?)', [email, password]);
    if (rows.affectedRows > 0) {
        res.send('register successful')
    } else {
        res.send('register failed')
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
