var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false }); 
/*
app.get('/', function(request, response) {
	//throw 'Error' //simulate an error
	response.send('OK');
});
*/


app.use(express.static('public'));

	var cities =  {
		'Lotopiax': 'descriere 1',
		'Caspiana': 'descriere',
		'Indigo': 'descriere3'
	}

app.get('/cities', function(request, response) {
	response.json(Object.keys(cities));
	//response.json('OK');
});

app.post('/cities', urlencode, function(request, response) {
	var newCity =  request.body;
	cities[newCity.name] = newCity.description;
	response.status(201).json(newCity.name);
});

//app.listen(3000);
module.exports = app;