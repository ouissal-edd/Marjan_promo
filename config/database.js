const mysql = require('mysql');
const connexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB
})

connexion.connect((error) => {
    if (error) {
        console.error('Erreur:' + error);
        return
    }
    console.log('connect to mysql');
})
module.exports = connexion;