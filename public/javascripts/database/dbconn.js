const mysql = require('mysql');
const secret = require('../functions/secret.js');

const pool = mysql.createPool({
         host: secret._DB._HOST,
         user: secret._DB._USER,
         password: secret._DB._PASSWORD,
         database: secret._DB._DATABASE
});

module.exports = pool;
