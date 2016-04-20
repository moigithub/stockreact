var path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = process.env['NODE_ENV']=="development";
module.exports = {
    // Gives you sourcemaps without slowing down rebundling
  devtool: isDev ?'eval':'eval-source-map',
  devServer: {
//        contentBase: './client/public',
        progress: true,
        colors: true 
    },
  
  context: __dirname + "/client",
  entry: [
    // Add the client which connects to our middleware
    // You can use full urls like 'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr'
    // useful if you run your app from another point like django
     'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
     "./main.js",
     "./index.html",      
  ],

  output: {
    publicPath:'/',
    filename: "bundle.js",
    path: __dirname + "/public",
  },
  
  module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          include: path.join(__dirname, 'client'), 
          loader: ["babel-loader"], 
          query: {
              presets: ['es2015', 'react', 'react-hmre']
            },
        },
        {
          test: /\.html$/,
          loader: "file?name=[name].[ext]",
        },
        {
              test: /\.css$/,
              include: path.join(__dirname, 'client'),
              //loader: "style!css"
              loader: ExtractTextPlugin.extract("style-loader", "css-loader"),

              
//              loader: ExtractTextPlugin.extract('style', 'css?modules&localIdentName=[name]---[local]---[hash:base64:5]!postcss')
        },
      ],
  },
  
    plugins: [
        new ExtractTextPlugin("styles.css"),

    // Webpack 1.0
    new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()        
    
/*
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
      
    }),    
*/
    ],
    resolve: {
        // you can now require('file') instead of require('file.coffee')
        extensions: ['', '.js', '.json', '.coffee'] 
    }
}