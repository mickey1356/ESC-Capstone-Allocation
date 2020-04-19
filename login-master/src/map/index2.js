const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app = express();

const {Allocator} = require("./allocate.js");
const {SPACE1, SPACE2} = require("./space.js");

const SELECT_ALL_BOOTHS_QUERY = 'SELECT * FROM registration';

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'password',
    database: 'capstone_form',
    multipleStatements: true
});


connection.connect(function(err){
    if (err){
        return err;
    }

    var sql = "UPDATE registration SET groupName='Pick' WHERE groupName='Picky'";
    connection.query(sql, function(err, result){
        if (err){
            return err;
        }
        // console.log(result.affectedRows + "record(s) updated");
        // console.log(result);
    })
})

app.use(cors());

app.get('/registration/update', (req,res) => {
    const{id, width, height, PosX, PosY, a_width, a_height} = req.query;
    console.log(id, width, height, PosX, PosY, a_width, a_height);
    const INSERT_REGISTRATION_QUERY =
    `UPDATE registration SET PosX=${PosX}, PosY=${PosY}, width=${width}, height=${height}, a_width=${a_width}, a_height=${a_height} WHERE id=${id}`;
    connection.query(INSERT_REGISTRATION_QUERY, (err, results) =>{
        if(err){
            console.log(err);
            return res.send(err)
        }
        else{
            return res.send('successfully updated booth')
        }
    });

})

app.get('/registration/update2', (req,res) => {
    const{id, width, height, PosX, PosY } = req.query;
    console.log(id, width, height, PosX, PosY);
    const INSERT_REGISTRATION_QUERY =
    `UPDATE registration SET PosX=${PosX}, PosY=${PosY}, width=${width}, height=${height} WHERE id=${id}`;
    connection.query(INSERT_REGISTRATION_QUERY, (err, results) =>{
        if(err){
            console.log(err);
            return res.send(err)
        }
        else{
            return res.send('successfully updated booth')
        }
    });

})

app.get('/registration/add', (req,res) =>{
    const{id, groupName, prototype, category, company, width, height, sizeNweight, powerpoints,
        pedestal, otherRequest, PosX, PosY, level} = req.query;
    const INSERT_REGISTRATION_QUERY =
    `INSERT INTO registration(id, groupName, prototype, category, company, width, height, sizeNweight, powerpoints, pedestal, otherRequest, PosX, PosY, level) VALUES(${id}, ${groupName}, ${prototype}, ${category}, ${company}, ${width}, ${height}, ${sizeNweight}, ${powerpoints}, ${pedestal}, ${otherRequest}, ${PosX}, ${PosY},${level})`;
    connection.query(INSERT_REGISTRATION_QUERY, (err, results) =>{
        if(err){
            return res.send(err)
        }
        else{
            return res.send('successfully added product')
        }
    });
});


app.get('/', (req,res) => {
    res.send('go to /products to see products')
});

app.get('/registration', (req, res) => {
    connection.query(SELECT_ALL_BOOTHS_QUERY, (err,results) =>{
        if(err){
            return res.send(err);
        }
        else{
            return res.json({
                data:results
            });
        }
    });
});

app.post("/allocate", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    // console.log(req);
    // console.log(res);
    let allocator = new Allocator();
    // console.log(p);

    allocator.load_grid(1, SPACE1);
    allocator.load_grid(2, SPACE2);

    connection.query('SELECT * FROM registration', (error, results, fields) => {
        if (error) return res.send(error);
        allocator.load_booths_obj(results);

    	allocator.allocate(60);

        // UPDATE registration SET posX = posX, posY = posY WHERE id = id
        let data = [];
        let queries = "";
        for (let id in allocator.f_allocation) {
            const px = allocator.f_allocation[id][0];
            const py = allocator.f_allocation[id][1];
            const aw = allocator.f_allocation[id][2];
            const ah = allocator.f_allocation[id][3];
            data.push([px, py, aw, ah, id]);
        }
        // console.log(data);
        data.forEach((item) => {
            queries += mysql.format("UPDATE registration SET PosX = ?, PosY = ?, a_width = ?, a_height = ? WHERE id = ?; ", item);
        });
        connection.query(queries, (error, results, fields) => {
            if (error) throw error;
            console.log("updated positions");
            // connection.end();
        });
    });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Done');
});

// console.log(connection);

app.listen(3535, () => {
    console.log('server listening on port 3535');
});
