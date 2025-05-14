const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});



connection.connect((err) => {
    if (err) throw err;
    console.log('✅ Conectado ao MySQL!');
});

module.exports = connection;
