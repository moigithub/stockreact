'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    Location:String, // user input.. chicago, san francisco, texas
    PlaceId: String,  // which bar from barlist
    Users: Array,     // who goin
});

var Place = mongoose.model('Place', PlaceSchema);



// check if place exist, update: check if user exist add/remove user
// else create a new one
function saveUserGoingToPlace(req, res){
  
  var placeId=req.body.placeId;
  var userId = req.body.userId;
  var location = req.body.search;
  console.log("save user going", placeId, userId, location);
  
  
  Place.find({PlaceId: placeId}, function(err, places){
      if(err){ return handleError(res,err);}
      if(!places){ return res.status(404).send("Not Found");}
      
      var data = {Location: location, PlaceId: placeId};
      // no user exist... add
      var foundIndex = places.Users.indexOf(userId);
      if(foundIndex===-1){
          places.Users.push(userId)
      } else {
          //user exist.. remove
          places.Users.splice(foundIndex,1);
      }
  });
  
  
  
  res.json(req.body);
}



function handleError(res, err) {
  return res.status(500).send(err);
}




var express = require('express');
var router = express.Router();

router.post('/', saveUserGoingToPlace);


module.exports = router;