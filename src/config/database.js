import mysql from 'mysql2';

// Conexão com o banco de dados...
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "meu_mercado"
});

export default db;