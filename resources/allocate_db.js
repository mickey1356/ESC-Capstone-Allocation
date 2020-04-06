const mysql = require("mysql");
const fs = require("fs");

const {Allocator, Path} = require("./allocate.js");

function setup_allocator(allocator) {

    // synchronous
    let contents = fs.readFileSync("space.csv", "utf8");
    allocator.load_grid(contents);

    // asynchronous
    // fs.readFile("space.csv", "utf8", function(err, contents) {
    //     console.log(contents);
    // });
}

function get_allocation(allocator, path) {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'myuser',
        password: 'password',
        database: 'capstone_form',
        multipleStatements: true
    });

    connection.connect();
    connection.query('SELECT * FROM registration', (error, results, fields) => {
        if (error) throw error;
        allocator.load_booths_obj(results);

    	allocator.greedy_allocate(path.get_rep());

        // UPDATE registration SET posX = posX, posY = posY WHERE id = id
        let data = [];
        let queries = "";
        for (let id in allocator.allocation) {
            const px = allocator.allocation[id][0];
            const py = allocator.allocation[id][1];
            data.push([px, py, id]);
        }
        data.forEach((item) => {
            queries += mysql.format("UPDATE registration SET posX = ?, posY = ? WHERE id = ?; ", item);
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

    let p = new Path(allocator.rows, allocator.cols);
    p.build_path_spiralout(63, 80, 0, 1);

    get_allocation(allocator, p);
}

run();
