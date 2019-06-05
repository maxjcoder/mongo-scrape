//dependencies
var express = require('express');
var mongoose = require('mongoose');
var expressHandlebars = require('express-handlebars');
var axios = require('axios');
var bodyParser = require('body-parser');


//dynamic port
var PORT = process.env.PORT || 3000;

//instantiate express app
var app = express();

//express router
var router = express.Router();

//require routes file; pass router object
require('./config/routes')(router);

//public folder is a static directory
app.use(express.static(__dirname + '/public'));

//connect Handlebars to Express
app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//body parser use in application
app.use(bodyParser.urlencoded({
    extended: false
}));

//middleware for every request to go through
app.use(router);

//use deployed db or the local mongoHeadlines db
var db = process.env.MONGODB_URI || 'mongodb://localhost/mongoHeadlines';

//connect to db
mongoose.connect(db, function(error) {
    //log errors
    if (error) {
        console.log(error);
    }
    //or log success
    else {
        console.log('mongoose connection is successful');
    }
});

//Listen on a port
app.listen(PORT, function() {
    console.log('Listening on port:' + PORT)
});