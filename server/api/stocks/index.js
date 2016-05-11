// Request API access: http://www.yelp.com/developers/getting_started/api_access 
//https://www.npmjs.com/package/yelp

'use strict';
var request=require("request");

function getStock(req,res){
//dont forget add/set environment variables with api data
//https://www.quandl.com/api/v3/datasets/WIKI/twtr/data.json?start_date=2015-05-11&end_date=2016-05-11
  var API ="https://www.quandl.com/api/v3/datasets/WIKI";
  var API_DATA="/data.json";
  var API_START_DATE="?start_date=";
  var API_END_DATE="&end_date=";
  
  var today = new Date()
  var API_URL = API + req.params.symbol + API_DATA + API_START_DATE + formatDate(today,1) + API_END_DATE + formatDate(today,0);

  request(API_URL, function(error, response, body) {
    if (error){
      return handleError(res, error);
    }
    
    console.log(body);
    res.json(body);
  });

}




function handleError(res, err) {
  return res.status(500).send(err);
}



///////////////////////////

var express = require('express');
var router = express.Router();

router.get('/:symbol', getStock);



module.exports = router;


////helper

function formatDate (date, year=0){
  return date.getYear()-year + "-" + date.getMonth() + "-" + date.getDay();
}