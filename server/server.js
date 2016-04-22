'use strict';
var http = require('http');
var path = require('path');
var express = require('express');
var morgan = require('morgan')
var favicon = require('serve-favicon');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var app = express();


  require('dotenv').config();

var isDeveloping = process.env.NODE_ENV !== 'production';
//console.log("env",process.env.NODE_ENV, isDeveloping);

if(isDeveloping){
  require('dotenv').config();

  var webpack = require('webpack');
  var webpackConfig =require('../webpack.config.js');
  //import webpack from 'webpack';  
  var webpackMiddleware =require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var compiler = webpack(webpackConfig);
  
  
  
  app.use(webpackMiddleware(compiler, {
      noInfo: true, 
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
      },
      hot: true,
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }));
}



var config={
  mongo:{
    options:{
      db:{safe:true}
    },
    uri : process.env.MONGO_URI || 'mongodb://localhost/nightreact'
  },
  secret:'supers3cretpassw0rd.dont.tell,any1'
};

/// connect to db
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err){
  console.error("error connecting to the DB "+ err);
  process.exit(-1);
});





app.use(express.static(path.resolve(path.join(__dirname,".."), 'public'))); // this above session/cookie middlewares prevent create for static files
app.use(favicon(__dirname+'/../public/favicon.ico'));


// middlewares

app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialized: true,
  store: new mongoStore({mongooseConnection: mongoose.connection, db: 'nightreact'})
}));


//app.use(passport.initialize());
//app.use(passport.session());

//form process
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride());

// request logger
app.use(morgan('dev'));


///////////// routes

app.use('/api/bars', require('./api/yelp'));
app.use('/api/places', require('./api/places'));






var server = http.createServer(app);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});
