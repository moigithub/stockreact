'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventEmitter =require('events').EventEmitter;

var ThingEvents = new EventEmitter();
// Set max event listeners (0 == unlimited)
ThingEvents.setMaxListeners(0);


var StockSchema = new Schema({
    name:String, // user input.. chicago, san francisco, texas
    desc: String,  // which bar from barlist
    data: Schema.Types.Mixed,
    lastUpdated: Date
});



 StockSchema.post('save', function (doc) {
    console.log("stock schame save")
    emitEvent('save')(doc)
  });
  StockSchema.post('remove', function (doc) {
    console.log("stock schame remove")
    emitEvent('remove')(doc)
  });


module.exports = {
	Stock  : mongoose.model('Stock', StockSchema),
	events : ThingEvents
}

function emitEvent(event) {
  return function(doc) {
    ThingEvents.emit(`${event}:${doc._id}`, doc);
    ThingEvents.emit(event, doc);
  };
}

