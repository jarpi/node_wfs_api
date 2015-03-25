var http = require('http'); 
var express = require('express');
var app = express(); 
var appPath = __dirname; 
var wfsMainApp = require(appPath+'/wfs-app.js'); 
var wfsMain = new wfsMainApp(); 
var server = undefined;  

module.exports.startServer = function(cb) 
{
	server = app.listen(3000, function () {
		var host = server.address().address
		var port = server.address().port
		// console.log('WFS layer app listening at http://%s:%s', host, port); 
		cb(); 
	}); 

	// Get http request (view, router) 
	app.get('/wfs', function (req, res) 
		{ 
			wfsMain.RunQuery(req.query, res); 
		}
	); 
}

module.exports.stopServer = function(cb) 
{
	server.close(function(){
		// console.log("Closed out remaining connections.");
		cb(); 
	}); 
} 

this.startServer(function(){
	// console.log('Server started succesfully'); 
}); 

