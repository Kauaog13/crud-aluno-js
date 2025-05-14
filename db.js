const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'kaua',
    password: 'senha123',
    database: 'facsenac'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('✅ Conectado ao MySQL!');
});

module.exports = connection;
