var http = require('http'); 
var express = require('express');
var app = express(); 
var appPath = __dirname; 
var wfsMainApp = require(appPath+'/wfs-app.js'); 
var wfsMain = new wfsMainApp(); 

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

