'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockSchema = new Schema({
    name:String, // user input.. chicago, san francisco, texas
    desc: String,  // which bar from barlist
    data: Schema.Types.Mixed,
    lastUpdated: Date
});

module.exports = mongoose.model('Stock', StockSchema);

