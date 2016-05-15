// Request API access: http://www.yelp.com/developers/getting_started/api_access 
//https://www.npmjs.com/package/yelp

'use strict';

var request=require("request");



function getStock(symbol, date, callback){
//dont forget add/set environment variables with api data
//https://www.quandl.com/api/v3/datasets/WIKI/twtr/data.json?start_date=2015-05-11&end_date=2016-05-11
  var API ="https://www.quandl.com/api/v3/datasets/WIKI/";
  var API_DATA="/data.json";
  var API_START_DATE="?start_date=";
  var API_END_DATE="&end_date=";
  
  var date = new Date();
  
  var API_URL = API + symbol + API_DATA + API_START_DATE + formatDate(date,1) + API_END_DATE + formatDate(date,0);

  var API_META="https://www.quandl.com/api/v3/datasets/WIKI/"+symbol+"/metadata.json"; //"/metadata.json";
  console.log(API_URL,"\n", API_META);
  
console.log("getting API meta");
  request(API_META, function(error, response, meta) {
    if (error )
      return callback(error);
console.log("meta",meta);

    meta=JSON.parse(meta);

    if(meta.hasOwnProperty("quandl_error")){
      
      console.log("error no data.. probably symbol dont exist");
      return callback(meta.quandl_error.message);
    //return;
      
    }

console.log("getting API data");
    request(API_URL, function(err, resp, data) {
        if (err){
          return callback(err);
        }
        
        data=JSON.parse(data);
        var body = {};

        body[meta["dataset"]["dataset_code"]]={
          "meta": meta.dataset,
          "data": data.dataset_data
        };
        return callback(null, body);
      });//end request data
  });//end request meta
}


module.exports = getStock;


////helper

//month start on 0
function formatDate (date, year=0){
//  if (year==undefined){year=0}
  return (date.getFullYear()-year) + "-" + (date.getMonth()+1) + "-" + date.getDate();
}