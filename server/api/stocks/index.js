'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockSchema = new Schema({
    symbol:String, // user input.. chicago, san francisco, texas
    name: String,  // which bar from barlist
    data: Schema.Types.Mixed,
    lastUpdated: Date
});

var Stocks = mongoose.model('Stock', StockSchema);

var quandl = require('../quandl');



// check if place exist, update: check if user exist add/remove user
// else create a new one
function addStock(req, res){
  
  var symbol=req.body.symbol.toUpperCase();

    quandl(symbol, new Date(), function(err, quandlData){
      if(err){ return handleError(res,err);}

      Stocks.findOne({symbol: symbol}, function(err, stock){
          if(err){ return handleError(res,err);}
          
          
          
          if(!stock ){ 
          // none added yet, im the first going
            var data = {
              symbol: symbol, 
              name: quandlData[symbol].meta.name, 
              data: quandlData[symbol].data,
              lastUpdated : new Date()
            };
            console.log(symbol,"***",data);
            
            Stocks.create(data,function(err){
                if(err){return handleError(res,err);}
                return res.status(200).json(data);
            });
    
          } else {
            //already exist
            return res.status(200).json(stock);
          }
      }); //findone

    });//quandl

}//addstock

function handleError(res, err) {
  return res.status(500).send(err);
}




var express = require('express');
var router = express.Router();

router.post('/', addStock);


module.exports = router;