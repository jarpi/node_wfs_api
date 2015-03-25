var fs = require('fs');
var http = require('http');
var appPath = __dirname;
var configFile = require(appPath + '/conf/app.conf.json');
var WFSMethod = require(appPath + '/models/WFSMethod.js');
var errorMessages = {
	queryNotRecognized:'Query not recognized', 
	methodNotRecognized:'Method not recognized', 
	methodTypeMismatch: 'Method type mismatch', 
	methodParamsMismatch: 'Params mismatch' 
};  

function WfsApp() 
{
	this.RunQuery = function (query, responseStream) {
		
		if (!query.request) {
			SendError(errorMessages.queryNotRecognized, 200, responseStream);
			return;
		}

		var candidateMethod = query.request;
		var classToInstantiate = GetClassDefitionByName(candidateMethod); 
		if (classToInstantiate === undefined) {
			SendError(errorMessages.methodNotRecognized, 200, responseStream);
			return;
		} 

		var classDefinition = require(appPath + classToInstantiate); 
		var instanceParams = GetClassParamsByName(candidateMethod); 
		var classInstance = new classDefinition(query, instanceParams); 
		if (!classInstance instanceof WFSMethod) {
			SendError(errorMessages.methodTypeMismatch, 200, responseStream);
		}

		var existsMandatoryParams = classInstance.fillMandatoryParams();
		if (!existsMandatoryParams) {
			SendError(errorMessages.methodParamsMismatch, 200, responseStream);
			return;
		} 

		classInstance.fillOptionalParams();
		var url = classInstance.createRequest();
		DispatchRequest(url, responseStream);
		return 1;
	};
}

// Once url is correct, and  query response created, send request 
// to API defined in business class 
function DispatchRequest(url, responseStream) { 
  http.request(url, function (response) { 
  	// Default content-type 
  	responseStream.setHeader('Content-type','application/json'); 
  	response.pipe(responseStream);
    response.once('data', function (data) { 
	    responseStream.status(200);
    });
    response.once('error', function (error) {
      SendError(error.toString(), 200, responseStream);
    });
    response.once('end', function () { 
    	responseStream.end();
    }); 
  }).once('error', function (error) {
    SendError(error.toString(), 200, responseStream);
  }).end();
};

// Get logic function to call from request query param (Controller) 
function GetClassDefitionByName(candidateMethod) { 
  if (configFile.availableMethods[candidateMethod].ModelDefinition !== undefined)
    return configFile.availableMethods[candidateMethod].ModelDefinition; 
  return undefined;
};

// Get method params 
function GetClassParamsByName(candidateMethod) { 
  if (configFile.availableMethods[candidateMethod].Params !== undefined)
    return configFile.availableMethods[candidateMethod].Params; 
  return undefined;
};

function SendError(error, statusCode, responseStream) { 
	responseStream.status(statusCode).json({ 'error': error }).end();
};

module.exports = WfsApp; 