//dependencies
var express = require("express");

//dynamic port
var PORT = process.env.PORT || 3000;

//instantiate express app
var app = express();

//express router
var router = express.Router();

//public folder is a static directory
app.use(express.static(__dirname + "/public"));

//middleware for every request to go through
app.use(router);

//Listen on a port
app.listen(PORT, function() {
    console.log("Listening on port:" + PORT)
});