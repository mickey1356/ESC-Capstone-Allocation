var mysql = require("mysql");

var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'password',
    database: 'capstone_form'
});

connection.connect(function(err){
    if (err) throw err;
    
    var sql = "UPDATE registration SET groupName='Pick' WHERE groupName='Picky'";
    connection.query(sql, function(err, result){
        if (err) throw err;
        console.log(result.affectedRows + "record(s) updated");
        console.log(result);
    })
})