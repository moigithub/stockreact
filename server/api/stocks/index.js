'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StockSchema = new Schema({
    name:String, // user input.. chicago, san francisco, texas
    desc: String,  // which bar from barlist
    data: Schema.Types.Mixed,
    lastUpdated: Date
});

var Stocks = mongoose.model('Stock', StockSchema);

var quandl = require('../quandl');



// check if place exist, update: check if user exist add/remove user
// else create a new one
function addStock(req, res){
  
  var symbol=req.body.symbol;
  if(!symbol) {return handleError(res, "Missing symbol name.")}
  
  symbol = symbol.toUpperCase();
console.log(symbol);


    quandl(symbol, new Date(), function(qerr, quandlData){
      if(qerr){ return handleError(res,qerr);}

      Stocks.findOne({name: symbol}, function(err, stock){
          if(err){ return handleError(res,err);}
          
          
          
          if(!stock ){ 
          // none added yet, im the first going
            var data = {
              name: symbol, 
              desc: quandlData[symbol].meta.name, 
              data: quandlData[symbol].data,
              lastUpdated : new Date()
            };
            console.log(symbol,"***");
            
            Stocks.create(data,function(serr){
                if(serr){return handleError(res,serr);}
                console.log("created data");
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
  console.log("error",err);
  return res.status(500).send(err);
}




var express = require('express');
var router = express.Router();

router.post('/', addStock);


module.exports = router;