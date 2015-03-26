[![Build Status](https://travis-ci.org/jarpi/node_wfs_api.svg?branch=master)](https://travis-ci.org/jarpi/node_wfs_api) 
[![Join the chat at https://gitter.im/jarpi/node_wfs_api](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jarpi/node_wfs_api?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# Web Feature Layer implementation in NodeJS 

### What's this project about? 

While i was at [h4ckademy](http://www.h4ckademy.com/) i was challanged to create a web feature layer 
to hit an API. The project itself must be open source and also fill a need for a company, so that's the goal of it. There's only one method implemented, but it's enough to see how it works and how to extend it, in a near future i expect to implement more methods. 

#### What's WFS? 

WFS it's an communication standard defined by [OGC](http://www.opengeospatial.org/standards/wfs) to retrieve and manipulate maps served by WMS (Web Map Service). It can take http requests or post requests in GML (derived from XML) 
[Example](http://giswebservices.massgis.state.ma.us/geoserver/wms?VERSION=1.1.1&REQUEST=GetMap&SERVICE=WMS&LAYERS=massgis:GISDATA.TOWNS_POLYM,massgis:GISDATA.NAVTEQRDS_ARC,massgis:GISDATA.NAVTEQRDS_ARC_INT&SRS=EPSG:26986&BBOX=232325.38526025353,898705.3447384972,238934.49648710093,903749.1401484597&WIDTH=570&HEIGHT=435&FORMAT=image/png&STYLES=Black_Lines,GISDATA.NAVTEQRDS_ARC::ForOrthos,GISDATA.NAVTEQRDS_ARC_INT::Default&TRANSPARENT=TRUE) 

### Usage  

I choosed NodeJS because i feel very comfortable with Javascript and also there’s nothing implemented before, so though was great to contribute to NodeJS community with something not done yet.

There’s a main “class” that parses a config file (app.conf.json), those objects defined, will be parsed and compared with the query that comes to the application layer, and then merged together, and then will call business method to call the API and return server response to user.


#### Show me that! 

```
{"availableMethods":
	{
		"GetFeature": {
			"ModelDefinition": "/models/WFSMethodGetFeature.js", 
			"Params": 
			{
				"MandatoryParams": {"request":"","typename":""},
				"OptionalParams": {"aliases":"","srsName":"","projectionClause":"","filter":"","resourceid":"","bbox":"","sortby":"","storedquery_id":"","storedquery_parameter":""}  
			} 
		}, 
		"AAA":{
			"ModelDefinition": "/models/WFSMethodGetFeature.js", 
			"Params": 
			{
				"MandatoryParams": {"request":"","typename":""},
				"OptionalParams": {"aliases":"","srsName":"","projectionClause":"","filter":"","resourceid":"","bbox":"","sortby":"","storedquery_id":"","storedquery_parameter":""}  
			} 
		}
	} 
} 
``` 
So WFS have 11 methods for now in 2.0 version, that's not so much, but i'm lazy so i've decided that the developer that is developing the final product must work. 
```app.conf.js``` define an ```availableMethods``` object, which contains the methods which our layer will answer. Besides the method definition will be defined a ```params``` object who will contain mandatory params and optional params for the request. That's simple, right? 

```In fact, we can use this library to hit any API, just adapt it at your will  ``` 

To add a new method to hit our API, edit ```conf/app.conf.json```, add your method definition, and your mandatory params and optional params. 
Create a new file inside models/*, with this structure: 
```
function WFSMethod[Feature_Name](queryParams, configParams) 
{ 
	WFSMethod.call(this, queryParams, configParams); 
	
}; 

WFSMethodGetFeature.prototype = Object.create(WFSMethod.prototype); 
WFSMethodGetFeature.prototype.constructor = WFSMethod[Feature_Name];  

WFSMethodGetFeature.prototype.createRequest = function() {}; 
``` 
And start serving. 

Enjoy! 

Thanks h4ckademy! You rock guys! 
