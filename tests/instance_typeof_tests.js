var appPath = __dirname; 
var wfsApp = require(appPath + '/../wfs-app.js'); 

function instance_typeof() {}; 

instance_typeof.AppLayer = function(test) 
{
	test.expect(2); 
	var appLayer = new wfsApp(); 
	test.ok((appLayer instanceof wfsApp), true, 'Instance not correctly instantiated'); 
	test.ok((appLayer.RunQuery instanceof Function), true, 'There is no \'RunQuery\' method'); 
	appLayer = null; 
	test.done(); 
}; 

module.exports = instance_typeof; 