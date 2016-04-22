'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlaceSchema = new Schema({
    location:String, // user input.. chicago, san francisco, texas
    placeId: String,  // which bar from barlist
    users: Array,     // who goin
});

var Place = mongoose.model('Place', PlaceSchema);



// check if place exist, update: check if user exist add/remove user
// else create a new one
function saveUserGoingToPlace(req, res){
  
  var placeId=req.body.placeId;
  var userId = req.body.userId;
  var location = req.body.search.toLowerCase();
  console.log("save user going", placeId, userId, location);
  
  
  Place.findOne({placeId: placeId, location:location}, function(err, places){
      if(err){ return handleError(res,err);}
      console.log("places findone",places);
      if(!places ){ 
      // none added yet, im the first going
        var data = {location: location, placeId: placeId, users:[userId]};
console.log("place data creating",data);
        Place.create(data,function(err){
            if(err){return handleError(res,err);}
            return res.status(200).json(data);
        });
          
      } else {
        
console.log("already exist.. looking users", places);
        
        
        // is already added.. me or some1 else coming too
        // var data = {Location: location, PlaceId: placeId};
        //check users array

        
            // no user exist... add
        var foundIndex = places.users.indexOf(userId);
        if(foundIndex===-1){
            places.users.push(userId)
        } else {
            //user exist.. remove
            places.users.splice(foundIndex,1);
        }
        
        places.save(function(err){
            if(err){return handleError(res,err);}
            return res.status(200).json(places);
        });
      }
  });
  

}


function getPlacesByLocation(req, res){
  var placeLocation = req.params.placeLocation;
console.log("places by loca", placeLocation);
  
    Place.find({location:placeLocation}, function(err, places){
      if(err){ return handleError(res,err);}
console.log("getPlacesbyLoca", places);
      
      if(!places||places.length==0){ console.log("no found");return res.status(404).send("No places found"); }
      console.log("sending places",places);
      return res.status(200).json(places);
    });
}


function handleError(res, err) {
  return res.status(500).send(err);
}




var express = require('express');
var router = express.Router();

router.post('/', saveUserGoingToPlace);
router.get('/:placeLocation', getPlacesByLocation);


module.exports = router;