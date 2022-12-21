const mysql = require('mysql');

// Database Connection
const conn = mysql.createConnection({
    host: 'mysql',
    user: 'ritul', // MySQL User
    password: '12345', // MySQL Password
    database: 'db',
    port: '3306', // MySQL Database 
});

// Shows Mysql Connect
conn.connect((err) => {
    console.log("Try to connecting........")
    if (!err) {
        console.log('Connection Established Successfully');
        }
    else
        console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
});

module.exports = conn;

