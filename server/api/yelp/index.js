// Request API access: http://www.yelp.com/developers/getting_started/api_access 
//https://www.npmjs.com/package/yelp
var express = require('express');

var router = express.Router();


function getBars(req,res){
      //dont forget add/set environment variables with api data

  var yelp = require("yelp").createClient({
    consumer_key:    process.env.YELP_CONSUMER_KEY || '', 
    consumer_secret: process.env.YELP_CONSUMER_SECRET || '',
    token:           process.env.YELP_TOKEN || '',
    token_secret:    process.env.YELP_TOKEN_SECRET || '',
    ssl: true
  });

//  console.log("yelp api location:(NO debe estar urlencoded) ",req.params.location);
  yelp.search({category_filter: "bars", location: req.params.location}, function(error, data) {
    if(error) { console.log("error",error); return handleError(res, error); }
    if(!data) { return res.status(404).send('Not Found'); }
    return res.json(data);
  });
}

function handleError(res, err) {
  return res.status(500).send(err);
}



///////////////////////////
router.get('/:location', getBars);

module.exports=router;