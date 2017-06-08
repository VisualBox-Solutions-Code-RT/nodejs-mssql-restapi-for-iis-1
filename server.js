//BASE SETUP
//===========================

//CALL THE PACKAGES ------------
var express = require('express'); //call express
var app = express(); //define our app using express
var bodyParser = require('body-parser'); //get body-parser will let us pull POST content from our HTTP request
var morgan = require('morgan'); //used to log requests on the console
var config = require('./config'); //referencing our config.js

//APP CONFIGURATION ---------------
//use body-parser so we can grab information from POST REQUESTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// configure our app to handle CORS requests
app.use(function(req, res, next){

	res.setHeader('Access-Control-Allow-Origin','*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	next();

});

//log all requests to the console
app.use(morgan('dev'));

// ROUTES FOR OUR API
// =============================
var apiRoutes = require('./app/routes/api')(app,express);

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', apiRoutes);

// START THE SERVER
// ===============================
app.listen(config.port);
console.log('Magic happens on port ' + config.port);
