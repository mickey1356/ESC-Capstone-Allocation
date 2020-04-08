var express = require("express");
var get_allocation = require("./allocate_db.js");

var app = express();
var server = app.listen(8000, () => {console.log("Listening to requests on port 8000") });

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

// templating engine
// app.set("view engine", "pug");

// routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use(express.static(__dirname));
