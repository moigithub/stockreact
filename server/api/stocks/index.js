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


  Stocks.findOne({name: symbol}, function(err, stock){
      if(err){ return handleError(res,err);}
      
      if(!stock ){ 
        // none added yet, im the first going

        quandl(symbol, new Date(), function(qerr, quandlData){
          if(qerr){ return handleError(res,qerr);}
          
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
        });//quandl

      } else {
        //already exist
        //return error
        //return res.status(200).json(stock);
        
        //409 Conflict
        return  res.status(409).send("Error: Symbol already exist");
        
        
      }
  }); //findone


}//addstock


function delStock(req, res){
  var symbol=req.params.symbol;
  if(!symbol) {return handleError(res, "Missing symbol name.")}
  
  symbol = symbol.toUpperCase();
  console.log("delete",symbol);


  Stocks.findOne({name: symbol}, function(err, stock){
    if(err){ return handleError(res,err);}
    if(!stock) { return res.status(404).send('Not Found'); }
    
    Stocks.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.status(204).send('No Content');
    });
  });

}//delete stokc

function getStock(req, res){
  Stocks.find({},function(err,stocks){
    if(err){ return handleError(res,err);}
    console.log("all stocks",stocks);
    return res.status(200).json(stocks);
    
  });
}

function handleError(res, err) {
  console.log("error",err);
  return res.status(500).send(err);
}





var express = require('express');
var router = express.Router();

router.get('/', getStock);
router.post('/', addStock);
router.delete('/:symbol', delStock);

module.exports = router;