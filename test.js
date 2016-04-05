var request = require('supertest');
var app = require('./app');

var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
client.flushdb();

describe('Requests to the root path', function() {
	
	it('Returns a 200 status code', function(done) {
		request(app)
		.get('/')
		.expect(200, done);
	});
	
	it('Returns a HTML format', function(done) {
		request(app)
		 .get('/')
		 .expect('Content-Type', /html/, done);
	});
	
	it('Returns an index file with cities', function(done){
		 request(app)
		  .get('/')
		  .expect(/cities/i, done);
	});
	
});



describe('Listing cities on /cities', function() {
	
	it('Returns 200 startus code', function(done) {
		request(app)
		.get('/cities')
		.expect(200, done);
		});

	 it('Returns JSON format', function(done) {
			request(app)
			 .get('/cities')
			 .expect('Content-Type', /json/, done); 
	});
	
	 it('Returns initial cities', function(done) {
			request(app)
			   .get('/cities')
			   .expect(JSON.stringify([]), done);
			   //.expect(JSON.stringify(['Lotopiax','Caspiana','Indigo']), done);
	  });
	
});	 

describe('Creationg new cities', function() {
	
	before(function() {
		
	});
	
	it('Returns a 201 status code', function(done) {
		
		request(app)
		  .post('/cities')
		  .send('name=Springfield&description=where+the+simposns+live')
		  .expect(201,done);
	});
	
	it('Return the city name', function(done) {
		
		request(app)
		 .post('/cities')
		 .send('name=Springfield&description=where+the+simposns+live')
		 .expect(/springfield/i, done);
		
	});
	
});


describe('Deleting cities', function() {
	
	before(function() {
		client.hset('cities', 'Banana', 'a tasty fruit');
	});
		
	after(function() {
			client.flushdb();
	});	
	
		it('Return a 204 status code', function(done) {
			
			request(app)
				.delete('/cities/Banana')
				.expect(204, done);
		});
});

	 
	 