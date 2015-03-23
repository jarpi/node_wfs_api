var http = require('http'); 

function Utils() {}; 

Utils.prototype.doGet = function (url, cb) 
{
	http.get(url, function(response){ 
		// // var data = ''; 
		// response.on('data', function(chunk){
		// 	// data += chunk; 
		// 	cb(null,chunk); 
		// }); 
		// response.on('end', function(){ 
		// 	return cb(null,"end"); 
		// }); 
		// response.on('error', function(){
		// 	data = "Error ocurred while parsing features..."; 
		// }); 
		cb(null,response); 
	}).on('error',function(error){ 
		return cb(error, null); 
	}); 
}; 

module.exports = Utils; 

