#!/usr/bin/env node

var app = require('./../app');
/*
var port = process.env.PORT || 3000;
app.listen(3000, function() {
	console.log('Listening on port' + port);
});
*/

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('Listening on 3000');
});