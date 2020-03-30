// var mysql = require('mysql');
// var express = require('express');
// var app = express();

// var con = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "password",
//     database: "capstone_form"
// })

// app.post('/form', function(req, res) {

//   var form = {
//       groupName: req.body.groupName,
//       prototype: req.body.prototype,
//       category: req.body.category,
//       company: req.body.company,
//       showcaseSpace: req.body.showcaseSpace,
//       sizeNweight: req.body.sizeNweight,
//       powerpoints: req.body.powerpoints,
//       pedestal: req.body.pedestal,
//       otherRequest: req.body.otherRequest
//   }
  
//   con.query('INSERT INTO registration (groupName, prototype, category, company, showcaseSpace, sizeNweight, powerpoints, pedestal, otherRequest) VALUES ?', form , function(err, result) {
//     if (err) throw err;
//     res.end(JSON.stringify(result));
//   });
//   res.end('Success');
// });

