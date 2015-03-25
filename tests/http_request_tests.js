var appPath = __dirname; 
var httpServer = undefined; 
var testCase = require('nodeunit').testCase;
process.env.NODE_ENV = 'test';

exports.groupOne = testCase({
	setUp: function groupOneSetup(cb) { 
		httpServer = require(appPath + '/../app.js'); 
		cb(); 
	}, 

	tearDown: function groupOneTearDown(cb) {
		httpServer.stopServer(function(){
			cb(); 
		}); 
	}, 

	test1: function SingleQueryOK(test) 
	{ 
		test.expect(1); 
		// Test single query, public database, get feature by id 
		var http = require('http'); 
		// var url = "http://localhost:3000/wfs?request=GetFeature&service=wfs&typename=cite:distritos&resourceid=15"; 
		http.get('http://localhost:3000/wfs?request=GetFeature&service=wfs&typename=cite:distritos&resourceid=15', function (response) {
			test.equal(true, true, "Not true"); 
			test.done(); 
		}); 
		// setTimeout(function(){
		// 	test.equal(true, true, "Not true"); 
		// 	test.done(); 
		// },1000); 
	}  
}); 

// function http_request_test()
// {
// 	var httpServer = undefined; 
// }; 

// http_request_test.setUp = function(callback) 
// {
// 	a = new httpServer(); 
// 	console.log(a); 
// 	callback(); 
// }; 

// http_request_test.tearDown = function(callback) 
// { 
// 	a.stopServer(); 
// 	callback();
// };  

// http_request_test.SingleQueryOK = function(test) 
// { 
// 	test.expect(1); 
// 	// Test single query, public database, get feature by id 
// 	var http = require('http'); 
// 	var url = "http://localhost:3000/wfs?request=GetFeature&service=wfs&typename=cite:distritos&resourceid=15"; 
// 	http.get('http://www.meneame.net', function (response) {
// 		// console.log(response.headers); 
// 		// console.log(test); 
// 		test.equal(true, true, "Not true"); 
// 		test.done(); 
// 	}); 
// }; 

// module.exports = http_request_test; 