var appPath = __dirname; 
var WFSMethod = require(appPath + '/WFSMethod.js'); 

function WFSMethodGetFeature(queryParams, configParams) 
{ 
	WFSMethod.call(this, queryParams, configParams); 
	
}; 

WFSMethodGetFeature.prototype = Object.create(WFSMethod.prototype); 
WFSMethodGetFeature.prototype.constructor = WFSMethodGetFeature;  

WFSMethodGetFeature.prototype.createRequest = function() {
	// http://jarpi.cartodb.com/api/v2/sql?q=SELECT+count(*)+FROM+distritos&api_key=bd6a0a7c3d64f870e375cd57489121e1fd9515e0 
	var httpRequest = "http://jarpi.cartodb.com/api/v2/sql?q="; 
	// var oAuthKey = "bd6a0a7c3d64f870e375cd57489121e1fd9515e0"; 
	var mandatoryParamsArray = this.mandatoryParams.typename.split(":"); 
	var workSpace = mandatoryParamsArray.slice(0); 
	var tableName = mandatoryParamsArray.slice(1); 
	var api_key = this.mandatoryParams.apikey; 
	var sqlQuery = "SELECT+*+FROM+" + tableName; 
	if (this.optionalParams.resourceid !== undefined)
	{
		sqlQuery += "+WHERE+cartodb_id=" + this.optionalParams.resourceid; 
	}
	httpRequest += sqlQuery + "&api_key=" + api_key;  
	return httpRequest; 
}; 

module.exports = WFSMethodGetFeature; 