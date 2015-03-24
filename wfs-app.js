var fs = require('fs');
var http = require('http');
var appPath = __dirname;
var configFile = require(appPath + '/conf/app.conf.json');
var WFSMethod = require(appPath + '/models/WFSMethod.js');

function WfsApp() 
{
	this.RunQuery = function (query, responseStream) {
		
		// Check that query has params, send error otherwise 
		if (!query.request) {
		SendError(responseStream, 400, 'Query not recognized');
		return;
		}

		// Extract request param == method to call 
		var candidateMethod = query.request;
		var classToInstantiate = GetClassDefitionByName(candidateMethod); 
		var classDefinition = require(appPath + classToInstantiate); 
		if (classToInstantiate === undefined) {
			SendError('Method not recognized', 400, responseStream);
			return;
		}

		var classInstance = new classDefinition(query, GetClassParamsByName(candidateMethod)); 
		if (!classInstance instanceof WFSMethod) {
			SendError('Method type mismatch', 400, responseStream);
		}

		var existsMandatoryParams = classInstance.fillMandatoryParams();
		if (!existsMandatoryParams) {
			SendError('Params mismatch', 400, responseStream);
			return;
		} 

		classInstance.fillOptionalParams();
		var url = classInstance.createRequest();
		DispatchRequest(url, responseStream);
		return 1;
	};
}

// Once url is correctly formed, send request to API 
function DispatchRequest(url, responseStream) {
  http.get(url, function (response) {
    response.once('data', function () {
      responseStream.status(202);
      response.pipe(responseStream);
    });
    response.once('error', function (error) {
      SendError(error.toString(), 404, responseStream);
    });
    response.once('end', function () { 
    	responseStream.end();
    	console.log(responseStream); 
    }); 
  }).once('error', function (error) {
    SendError(error.toString(), 404, responseStream);
  });
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