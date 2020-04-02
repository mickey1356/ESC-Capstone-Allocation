var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "capstone_form"
});

connection.connect(function(err){
    if (err) throw err;
    console.log("Connected!");
    connection.query("SELECT groupName, prototype, category, width, breadth FROM registration", function(err, result){
        if (err) throw err;
        console.log(result);
    })
});