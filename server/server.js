//
// # SimpleServer
//
// A simple chat server using Socket.IO, Express, and Async.
//
var http = require('http');
var path = require('path');
var express = require('express');
var favicon = require('serve-favicon');
var morgan = require('morgan')
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var passport = require('passport');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var webpackMiddleware =require('webpack-dev-middleware');
var webpackConfig =require('../webpack.config.js');
//import webpack from 'webpack';  
var webpack = require('webpack');
var webpackHotMiddleware = require('webpack-hot-middleware');

var app = express();


console.log("env",process.env);
var isDeveloping = process.env.NODE_ENV !== 'production';


if(isDeveloping){
  require('dotenv').config();
  
  
  var compiler = webpack(webpackConfig);
  app.use(webpackMiddleware(compiler, {
      noInfo: true, 
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true,
      }
  }));
  app.use(webpackHotMiddleware(compiler));
}

var yelp =require('./api/yelp');


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


var server = http.createServer(app);



app.use(express.static(path.resolve(path.join(__dirname,".."), 'public'))); // this above session/cookie middlewares prevent create for static files
app.use(favicon(__dirname+'../public/favicon.ico'));


// middlewares

app.use(session({
  secret: config.secret,
  resave: true,
  saveUninitialize:true,
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

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});
