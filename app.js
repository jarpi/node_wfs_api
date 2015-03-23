var http = require('http'); 
var express = require('express');
var app = express(); 
var appPath = __dirname; 
var wfsMainApp = require(appPath+'/WfsApp.js'); 
var WFSMethod = require(appPath+'/models/WFSMethod.js');
var wfsMain = new wfsMainApp(); 

// Init server 
wfsMain.LoadConfig(); 
var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('WFS layer app listening at http://%s:%s', host, port); 
}); 

// Get http request (view, router) 
app.get('/wfs', function (req, res) 
	{ 
		wfsMain.RunQuery(req.query, res); 
	}
); 

