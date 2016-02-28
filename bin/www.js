#!/usr/bin/env node

var app = require('./../app');
app.listen(3000, function() {
	console.log('Listening on port 3000 from the test folder');
});