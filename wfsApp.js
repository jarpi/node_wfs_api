'use strict';
var fs = require('fs');
var http = require('http');
var appPath = __dirname;
var configFile = require(appPath + '/conf/app.conf.json');
var methodObjects = {};
var methodObjectsParams = {};
var WFSMethod = require(appPath + '/models/WFSMethod.js');
var WFSMethodGetFeature = require(appPath + '/models/WFSMethodGetFeature.js');
function WfsApp() {}

// Fill relations between WFS methods ({wfs_method--->[Function]}, {wfs_method--->[Method params]}) 
WfsApp.prototype.LoadConfig = function () {
  // Load method instances into memory 
  this.FillMethodObjects();
  this.FillMethodParams();
};

// Create an object association between {wfs_method} ---> {[Function]}
WfsApp.prototype.FillMethodObjects = function () {
	var i = 0; 
	for (i = configFile.availableMethods.length - 1; i >= 0; i--) {
		var obj = configFile.availableMethods[i];
		for (property in obj) {
		  if (fs.existsSync(appPath + obj[property].ModelDefinition)) {
		    var method = require(appPath + obj[property].ModelDefinition);
		    methodObjects[property] = method;
		  } else {
		    throw new Error('Check your config file, available methods array contains errors');
		  }
		}
	}
}; 

// Create an object association between {wfs_method} ---> {[Params]}
WfsApp.prototype.FillMethodParams = function () {
  for (i = configFile.availableMethods.length - 1; i >= 0; i--) {
    var obj = configFile.availableMethods[i];
    for (property in obj) {
      methodObjectsParams[property] = obj[property].Params;
    }
  }
};

// Get logic function to call from request query param (Controller) 
WfsApp.prototype.GetMethodObject = function (candidateMethod) {
  if (methodObjects[candidateMethod] !== undefined)
    return methodObjects[candidateMethod];
  return undefined;
};

WfsApp.prototype.RunQuery = function (query, responseStream) {
  // Check that query has params, send error otherwise 
  if (!query.request) {
    this.SendError(responseStream, 400, 'Query not recognized');
    return;
  }
  // Extract request param == method to call 
  var candidateMethod = query.request;
  var methodToCall = this.GetMethodObject(candidateMethod);
  if (methodToCall === undefined) {
    this.SendError('Method not recognized', 400, responseStream);
    return;
  }
  // Create new instance of the method 
  // 		// Call check params and get result 
  // 		// Parse params 
  // 		// Send request to server 
  // 		// Return result to user (pipe? pipe result from server to user)
  var methodInstance = new methodToCall(query, methodObjectsParams[candidateMethod]);
  if (!methodInstance instanceof WFSMethod) {
    this.SendError('Method type mismatch', 400, responseStream);
  }
  var existsMandatoryParams = methodInstance.fillMandatoryParams();
  if (!existsMandatoryParams) {
    this.SendError('Params mismatch', 400, responseStream);
    return;
  }
  methodInstance.fillOptionalParams();
  var url = methodInstance.createRequest();
  console.log(url);
  this.DispatchRequest(url, responseStream);
  return 1;
};

// Once url is correctly formed, send request to API 
WfsApp.prototype.DispatchRequest = function (url, responseStream) {
  http.get(url, function (response) {
    response.once('data', function () {
      responseStream.status(202);
      response.pipe(responseStream);
    });
    response.once('error', function (error) {
      this.SendError(error.toString(), 404, responseStream);
    });
    response.once('end', function () {
      responseStream.end();
    });
  }).once('error', function (error) {
    this.SendError(error.toString(), 404, responseStream);
  });
};

WfsApp.prototype.SendError = function (error, statusCode, responseStream) {
  responseStream.status(statusCode).json({ 'error': error }).end();
};
module.exports = WfsApp; 