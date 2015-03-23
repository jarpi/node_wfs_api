function WFSMethod(queryParams, params) {
	this.mandatoryParams = params.MandatoryParams; 
	this.optionalParams = params.OptionalParams; 
	this.queryParams = queryParams; 
};  

WFSMethod.prototype.fillOptionalParams = function() { 
	var that = this; 
	var iOkParamsCount = 0; 
	Object.keys(this.optionalParams).forEach( 
			function(key){ 
				if (key in that.queryParams && that.queryParams[key] !== undefined) 
					that.optionalParams[key] = that.queryParams[key]; 
			}); 
	return (Object.keys(this.optionalParams).length);  
}; 

WFSMethod.prototype.fillMandatoryParams = function() { 
	var that = this; 
	var iOkParamsCount = 0;
	Object.keys(this.mandatoryParams).forEach( 
			function(key){ 
				if (!key in that.queryParams || that.queryParams[key] === undefined) 
					return undefined; 
				iOkParamsCount += 1; 
				that.mandatoryParams[key] = that.queryParams[key]; 
			}); 
	return (iOkParamsCount == Object.keys(this.mandatoryParams).length);  
}; 

WFSMethod.prototype.fillMandatoryParams = function() {}; 

module.exports = WFSMethod; 