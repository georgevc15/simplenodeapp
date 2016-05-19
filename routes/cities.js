var express = require('express');

var bodyParser = require('body-parser');
var urlencode = bodyParser.urlencoded({ extended: false }); 

//redis connection
var redis = require('redis');
if (process.env.REDISTOGO_URL) {
	var rtg   = require("url").parse(process.env.REDISTOGO_URL);
	var client = redis.createClient(rtg.port, rtg.hostname);
	client.auth(rtg.auth.split(":")[1]);
} else {
	var client = redis.createClient();
	client.select((process.env.NODE_ENV || 'development').length);
}

//end redis connection
/*
client.hset('cities', 'Lotopiax', 'description');
client.hset('cities', 'Caspiana', 'description');
client.hset('cities', 'Indigo', 'description');
*/	
	/*var cities =  {
		'Lotopiax': 'descriere 1',
		'Caspiana': 'descriere',
		'Indigo': 'descriere3'
	}*/

var router = express.Router();	
	
router.route('/') 
    .get(function(request, response) {
		client.hkeys('cities', function(error, names){
			if(error) throw error;
			
			response.json(names);
			//response.json(Object.keys(cities));
	});
	//response.json('OK');
})

	.post(urlencode, function(request, response) {
		var newCity =  request.body;
		if(!newCity.name || !newCity.description){
			response.sendStatus(400);
			return false;
		}
		client.hset('cities', newCity.name, newCity.description, function(error) {
			if(error) throw error;
			
			response.status(201).json(newCity.name);
		});
		//cities[newCity.name] = newCity.description;
	});

router.route('/:name')	
	.delete(function(request, response) {
		client.hdel('cities', request.params.name, function(error) {
				if(error) throw error;
				response.sendStatus(204);
		});
	})

	.get(function(request, response) {
		client.hget('cities', request.params.name, function(error, description) {
			response.render('show.ejs', 
			{ city: 
			  { name: request.params.name, description: description }
			});
		});
		//response.sendStatus('OK');
		//response.sendStatus(200);
	});

	module.exports = router;
//app.listen(3000);