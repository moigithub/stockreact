// Request API access: http://www.yelp.com/developers/getting_started/api_access 
//https://www.npmjs.com/package/yelp

'use strict';

function getBars(req,res){
      //dont forget add/set environment variables with api data

  var Yelp = require('yelp');
  var yelp = new Yelp({
    consumer_key:    process.env.YELP_CONSUMER_KEY || '', 
    consumer_secret: process.env.YELP_CONSUMER_SECRET || '',
    token:           process.env.YELP_TOKEN || '',
    token_secret:    process.env.YELP_TOKEN_SECRET || '',
  });
   
  // See http://www.yelp.com/developers/documentation/v2/search_api 
//  console.log("yelp api location:(NO debe estar urlencoded) ",req.params.location);
  yelp.search({ category_filter: "bars", location: req.params.location })
  .then(function (data) {
    if(!data) { return res.status(404).send('Not Found'); }
    return res.json(data);
  })
  .catch(function (error) {
    if(error) { console.log("error",error); return handleError(res, error); }
  });

}

function handleError(res, err) {
  return res.status(500).send(err);
}



///////////////////////////

var express = require('express');
var router = express.Router();

router.get('/:location', getBars);


module.exports = router;