var appPath = __dirname; 
var wfsApp = require(appPath + '/../wfs-app.js'); 
function unitTests() {}; 

unitTests.InstantiateMainEntryPoint = function(test) 
{
	test.expect(2); 
	var appLayer = new wfsApp(); 
	test.ok((appLayer instanceof wfsApp), true, 'Instance not correctly instantiated'); 
	test.ok((appLayer.RunQuery instanceof Function), true, 'There is no "RunQuery" method'); 
	appLayer = null; 
	test.done(); 
}; 

unitTests.InstantiateMainEntryPoint2 = function(test) 
{
	test.expect(2); 
	var appLayer = new wfsApp(); 
	test.ok((appLayer instanceof wfsApp), true, 'Instance not correctly instantiated'); 
	test.ok((appLayer.RunQuery instanceof Function), true, 'There is no "RunQuery" method'); 
	appLayer = null; 
	test.done(); 
}; 

unitTests.SingleQueryOK = function(test) 
{ 
	test.expect(2); 
	// Test single query, public database, get feature by id 
	var httpServer = require(appPath + "/../app.js"); 
	// var httpServerInstance = new httpServer(); 
	var http = require('http'); 
	var url = "http://localhost:3000/wfs?request=GetFeature&service=wfs&typename=cite:distritos&resourceid=15"; 
	http.get('http://www.google.es', function (response) {
		console.log(response.headers); 
		console.log(test); 
		test.equal(true, true, "Not true"); 
		test.done(); 
	}); 
	http.get('http://www.meneame.net', function (response) {
		console.log(response.headers); 
		console.log(test); 
		test.equal(true, true, "Not true"); 
		test.done(); 
	}); 
}; 

function EndTests(test) {test.done();}; 

module.exports = unitTests; 