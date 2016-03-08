var express = require('express');
var app = express();

/*
app.get('/', function(request, response) {
	//throw 'Error' //simulate an error
	response.send('OK');
});
*/

app.use(express.static('public'));

app.get('/cities', function(request, response) {
	//response.json('OK');
	var cities =  ['Lotopiax','Caspiana','Indigo'];
	response.json(cities);
});

//app.listen(3000);
module.exports = app;