// Importación de dependencias necesarias
const express = require('express') // Framework web para Node.js
const mysql = require('mysql2'); // Driver de MySQL para Node.js

// Inicialización de la aplicación Express
const app = express()
const port = 3000 // Puerto donde correrá el servidor

// Configuración del pool de conexiones a la base de datos MySQL
// Un pool permite reutilizar conexiones y mejorar el rendimiento
const pool = mysql.createPool({
    host: 'localhost', // Servidor de base de datos
    user: 'root',      // Usuario de MySQL
    database: 'meli',  // Nombre de la base de datos
});



// Endpoint para el login de usuarios
// Método GET: /login?email=usuario@email.com&password=123456
app.get('/login', async (req, res) => {
    // Extrae email y password de los parámetros de la URL
    const { email, password } = req.query

    // Consulta a la base de datos para verificar las credenciales
    // Usa prepared statements (?) para prevenir inyección SQL
    const [rows] = await pool.promise()
        .query('SELECT `id`, `email`, `password` FROM `usuarios` WHERE email = ? AND password = ?', [email, password]);

    // Verifica si se encontró algún usuario con esas credenciales
    if (rows.length > 0) {
        res.send('login successful') // Usuario encontrado
    } else {
        res.send('invalid credentials') // Credenciales incorrectas
    }
})

// Endpoint para el registro de nuevos usuarios
// Método GET: /register?email=nuevo@email.com&password=123456
app.get('/register', async (req, res) => {
    // Extrae email y password de los parámetros de la URL
    const { email, password } = req.query

    // Inserta un nuevo usuario en la base de datos
    // Usa prepared statements (?) para seguridad
    const [rows] = await pool.promise()
        .query('INSERT INTO `usuarios` (`email`, `password`) VALUES (?, ?)', [email, password]);

    // Verifica si la inserción fue exitosa
    if (rows.affectedRows > 0) {
        res.send('register successful') // Usuario creado exitosamente
    } else {
        res.send('register failed') // Error al crear usuario
    }
})

// Inicia el servidor en el puerto especificado
// El servidor quedará escuchando peticiones HTTP
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`)
    console.log('Endpoints disponibles:')
    console.log('- GET /login?email=tu@email.com&password=tupassword')
    console.log('- GET /register?email=nuevo@email.com&password=nuevapassword')
})
