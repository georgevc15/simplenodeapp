var express = require('express');
var app = express();

app.get('/', function(request, response) {
	//throw 'Error' //simulate an error
	response.send('OK');
});

//app.listen(3000);
module.exports = app;