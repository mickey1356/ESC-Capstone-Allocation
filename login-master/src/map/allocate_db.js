const mysql = require("mysql");
const fs = require("fs");
const {Allocator, Path} = require("./allocate.js");
const SPACE = require("./space.js");

function setup_allocator(allocator) {

    // synchronous
    // let contents = fs.readFileSync("space.csv", "utf8");
    // console.log(SPACE);
    allocator.load_grid(SPACE);
    // console.log(allocator.grid);

    // asynchronous
    // fs.readFile("space.csv", "utf8", function(err, contents) {
    //     console.log(contents);
    // });
}

function get_allocation(allocator) {

    var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password: 'password',
        database: 'capstone_form',
        multipleStatements: true
    });

    connection.connect();
    connection.query('SELECT * FROM registration', (error, results, fields) => {
        if (error) throw error;
        allocator.load_booths_obj(results);

    	allocator.allocate();

        // UPDATE registration SET posX = posX, posY = posY WHERE id = id
        let data = [];
        let queries = "";
        for (let id in allocator.allocation) {
            const px = allocator.allocation[id][0];
            const py = allocator.allocation[id][1];
            data.push([px, py, id]);
        }
        data.forEach((item) => {
            queries += mysql.format("UPDATE registration SET PosX = ?, PosY = ? WHERE id = ?; ", item);
        });
        connection.query(queries, (error, results, fields) => {
            if (error) throw error;
            console.log("updated positions");
            connection.end();
        });
    });
}

function run() {
    let allocator = new Allocator();
    // console.log(p);

    setup_allocator(allocator);
    get_allocation(allocator);
}

//run();

module.exports = run;
