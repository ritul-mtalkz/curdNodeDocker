const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

// const database = require('./sqlConnecter.js');

const port = process.env.NODE_DOCKER_PORT || 3000;

// Database Connection
const conn = mysql.createConnection({
    host: 'mysql',
    user: 'ritul', // MySQL User
    password: '12345', // MySQL Password
    database: 'db',
    port: '3306', // MySQL Database 
});

function connectDB(conn){
    conn.connect((err) => {
        console.log("Try to connecting........")
        if (!err) {
            console.log('Connection Established Successfully');
        }
        else
            console.log('Connection Failed!' + JSON.stringify(err, undefined, 2));
    });
}

const app = express();
app.use(bodyParser.json());

app.get("/createdb", (req, res) => {
    // Shows Mysql Connect
    connectDB(conn);
    // Query to create table
    // let query = "CREATE TABLE costumer (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255))";
    let query = "CREATE TABLE IF NOT EXISTS costumer (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), address VARCHAR(255)) "
    conn.query(query, (err, rows) => {
        if (err) {
            console.log("Table Creation Failed " + err);
            return res.status(500).send("Table Creation Failed");
        } else {
            console.log("Table Created");
            return res.send("Successfully Created Table - costumer");
        }
    })
});

//  Get All Items
app.get('/', (req, res) => {
    let sqlQuery = "SELECT * FROM costumer";
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});
//  Create Demo Data For Data Base
app.post('/demoData', (req, res) => {
    let sqlQuery = "INSERT INTO costumer (name, address) VALUES ?";
    let values = [
    ['John', 'Highway 71'],
    ['Amy', 'Apple st 652'],
    ['Hannah', 'Mountain 21'],
    ['Michael', 'Valley 345'],
    ['Sandy', 'Ocean blvd 2'],
    ['Betty', 'Green Grass 1'],
    ['Richard', 'Sky st 331'],
    ['Susan', 'One way 98'],
    ['Vicky', 'Yellow Garden 2'],
    ['Ben', 'Park Lane 38'],
    ['William', 'Central st 954'],
    ['Chuck', 'Main Road 989'],
    ['Viola', 'Sideway 1633']
  ];
    let data = { name: req.body.name, address: req.body.address };
    let query = conn.query(sqlQuery, [values], (err, results) => {
        if (err) throw err;
        console.log("Number of records inserted: " + results.affectedRows);
        res.send(apiResponse(results));
    });
});

// Insert data into database
app.post('/costumer', (req, res) => {
    let sqlQuery = `INSERT INTO costumer (name, address) VALUES ("${req.body.name}", "${req.body.address}")`;
    // let data = { name: req.body.name, address: req.body.address };
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        console.log("Number of records inserted: " + results.affectedRows);
        res.send(apiResponse(results));
    });
});

// Get Single Item
app.get('/costumer/:id', (req, res) => {
    let sqlQuery = "SELECT * FROM costumer WHERE id=" + req.params.id;
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

//  Update Item
app.put('/costumer/:id', (req, res) => {
    console.log(req.body, "**********************")
    // let sqlQuery = "UPDATE costumer SET name='" + req.body.name + "', body='" + req.body.address + "' WHERE id=" + req.params.id;
    let sqlQuery = `UPDATE costumer SET name="${req.body.name}", address= "${req.body.address}" WHERE id= ${req.params.id}`;
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) {
            console.log("We got An error while updating your record " + err);
            return res.status(500).send("We got An error while updating your record");
        } else {
            console.log("Successfully Updated");
            res.send(apiResponse(results));
        }
    });
});

//  Delete Item
app.delete('/costumer/:id', (req, res) => {
    let sqlQuery = "DELETE FROM costumer WHERE id=" + req.params.id + "";
    let query = conn.query(sqlQuery, (err, results) => {
        if (err) throw err;
        res.send(apiResponse(results));
    });
});

//  API Response @return response()
function apiResponse(results) {
    return JSON.stringify({ "status": 200, "error": null, "response": results },undefined, 2);
}

// start the server on port 3000
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
