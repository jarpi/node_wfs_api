var appPath = __dirname; 
var httpServer = undefined; 
var testCase = require('nodeunit').testCase;
process.env.NODE_ENV = 'test';

function http_request_test()
{
	var httpServer = undefined; 
}; 

http_request_test.setUp = function(cb) 
{
	if (httpServer !== undefined)
	{
		httpServer.startServer(function(){
			cb(); 
		}); 
	} 
	else 
	{
		httpServer = require(appPath + '/../app.js'); 
		cb(); 
	} 
}; 

http_request_test.tearDown = function(cb) 
{ 
	httpServer.stopServer(function(){
		cb(); 
	}); 
};  

http_request_test.SimpleQueryNoParams = function(test) 
{ 
	test.expect(3); 
	var http = require('http'); 
	var url = "http://127.0.0.1:3000/wfs"; 
	http.request(url, function (response) {  
		var data = ""; 
		// console.log(response); 
		test.equal(response.statusCode, 200, "Wrong status code"); 
		test.notEqual(response.headers["content-type"].indexOf('application/json'), -1, 'Wrong application/type header sent'); 
		response.on('data', function(chunk){
			data += chunk; 
		}); 
		response.on('end', function(){
			test.equal(data, '{"error":"Query not recognized"}', 'Error messsage expected to be {\'error\':\'Query not recognized\'}'); 
			test.done(); 
		}); 
	}).end(); 
}; 

http_request_test.SimpleQueryParamsMismatch = function(test) 
{ 
	test.expect(3); 
	// Test single query, public database, get feature by id 
	var http = require('http'); 
	var url = "http://127.0.0.1:3000/wfs?request=GetFeature"; 
	http.request(url, function (response) {  
		var data = ""; 
		// console.log(response); 
		test.equal(response.statusCode, 200, "Wrong status code"); 
		test.notEqual(response.headers["content-type"].indexOf('application/json'), -1, 'Wrong application/type header sent'); 
		response.on('data', function(chunk){
			data += chunk; 
		}); 
		response.on('end', function(){
			test.equal(data, '{"error":"Params mismatch"}', 'Error messsage expected to be {\'error\':\'Params mismatch\'}'); 
			test.done(); 
		}); 
	}).end(); 
}; 

http_request_test.SelectAllFromDatastore = function(test) 
{ 
	test.expect(3); 
	// Test single query, public database, get feature by id 
	var http = require('http'); 
	var url = "http://127.0.0.1:3000/wfs?request=GetFeature&typename=cite:distritos"; 
	http.request(url, function (response) {  
		var data = "";  
		test.equal(response.statusCode, 200, "Wrong status code"); 
		test.notEqual(response.headers["content-type"].indexOf('application/json'), -1, 'Wrong application/type header sent'); 
		response.on('data', function(chunk){
			data += chunk; 
		}); 
		response.on('end', function(){ 
			test.equal(data['error'], undefined, 'Got: ' + data); 
			test.done(); 
		}); 
	}).end(); 
}; 

http_request_test.SelectByResourceId = function(test) 
{ 
	test.expect(3); 
	// Test single query, public database, get feature by id 
	var http = require('http'); 
	var url = "http://127.0.0.1:3000/wfs?request=GetFeature&typename=cite:distritos&resourceid=15"; 
	http.request(url, function (response) {  
		var data = "";  
		test.equal(response.statusCode, 200, "Wrong status code"); 
		test.notEqual(response.headers["content-type"].indexOf('application/json'), -1, 'Wrong application/type header sent'); 
		response.on('data', function(chunk){
			data += chunk; 
		}); 
		response.on('end', function(){ 
			test.equal(JSON.stringify(data)['error'], undefined, 'Got: ' + data); 
			test.done(); 
		}); 
	}).end(); 
}; 

http_request_test.SelectAllFromDatastoreTableNotExists = function(test) 
{ 
	test.expect(3); 
	// Test single query, public database, get feature by id 
	var http = require('http'); 
	var url = "http://127.0.0.1:3000/wfs?request=GetFeature&typename=cite:distrito"; 
	http.request(url, function (response) {  
		var data = "";  
		test.equal(response.statusCode, 200, "Wrong status code"); 
		test.notEqual(response.headers["content-type"].indexOf('application/json'), -1, 'Wrong application/type header sent'); 
		response.on('data', function(chunk){
			data += chunk; 
		}); 
		response.on('end', function(){ 
			unstringifiedData = JSON.parse(data); 
			test.notEqual(unstringifiedData.error, undefined, 'Got: ' + unstringifiedData); 
			test.done(); 
		}); 
	}).end(); 
}; 

http_request_test.SelectByResourceIdTableNotExists = function(test) 
{ 
	test.expect(3); 
	// Test single query, public database, get feature by id 
	var http = require('http'); 
	var url = "http://127.0.0.1:3000/wfs?request=GetFeature&typename=cite:distrito&resourceid=15"; 
	http.request(url, function (response) {  
		var data = "";  
		test.equal(response.statusCode, 200, "Wrong status code"); 
		test.notEqual(response.headers["content-type"].indexOf('application/json'), -1, 'Wrong application/type header sent'); 
		response.on('data', function(chunk){
			data += chunk; 
		}); 
		response.on('end', function(){ 
			unstringifiedData = JSON.parse(data); 
			test.notEqual(unstringifiedData.error, undefined, 'Got: ' + data); 
			test.done(); 
		}); 
	}).end(); 
};

module.exports = http_request_test; 