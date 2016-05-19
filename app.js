var express = require('express');
var app = express();

/*
app.get('/', function(request, response) {
	//throw 'Error' //simulate an error
	response.send('OK');
});
*/
app.use(express.static('public'));

var cities = require('./routes/cities');
app.use('/cities', cities);

module.exports = app;