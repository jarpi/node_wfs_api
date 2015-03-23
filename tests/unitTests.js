var appPath = __dirname; 
var wfsApp = require("../wfs-app.js"); 
function unitTests() {}; 
unitTests.LoadConfig = function(test) 
{
	var appLayer = new wfsApp(); 
	test.ok(appLayer, {}, "Instance has params"); 
	appLayer.LoadConfig(); 
	// Check var instances are filled 
	var methods = appLayer.GetMethods(); 
	var methodsParams = appLayer.GetMethodsParams(); 
	test.notEqual(methods, {}, "Have you filled app.conf.json? Check config file and try again"); 
	test.notEqual(methodsParams, {}, "Have you filled app.conf.json? Check config file and try again"); 
	test.ok(methods.hasOwnProperty('GetFeature'), true, 'Something gone wrong, \'GetFeature\' method not found in methods'); 
	test.ok(methodsParams.hasOwnProperty('GetFeature'), true, 'Something gone wrong, \'GetFeature\' method not found in method params'); 
	test.done(); 
}; 

module.exports = unitTests; 