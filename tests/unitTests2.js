// var nodeunit = require("../node_modules/nodeunit"); 
function unitTests2() {}; 
unitTests2.tryTest = function(test) 
{
	test.ok(true===true, "This should pass"); 
	test.ok(true===true, "Pass..."); 
	test.done(); 
}; 

unitTests2.tryTest2 = function(test) 
{
	test.notStrictEqual(false, true, "This should not pass"); 
	test.done(); 
}; 

module.exports = unitTests2; 