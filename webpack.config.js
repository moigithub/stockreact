var path = require('path');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDev = process.env['NODE_ENV']=="development";

 
console.log("__dirname+client",path.join(__dirname, 'client'));
console.log("isDev",isDev);

module.exports = {
    // Gives you sourcemaps without slowing down rebundling
  devtool: isDev ? 'eval-source-map':'source-map',
/*
  devServer: {
//        contentBase: './client/public',
        progress: false,
        colors: true 
    },
*/
  target: 'web',
  entry: ['babel-polyfill','./client/main.js'],
  output: {
    path:path.resolve(__dirname, './public'),
//    libraryTarget: 'commonjs',
//    publicPath: '/',
    filename: 'bundle.js'
  },
  context: __dirname + "/",
//  context: __dirname + "/",
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    // you can now require('file') instead of require('file.coffee')
    //root: path.resolve(__dirname),
  },
  module: {
    rules: [
        {
          test: /\.jsx?$/,
          use:{
            loader: 'babel-loader',
            options: {
              presets: ['es2015', 'react', 'stage-0']
            }
          },
          exclude: /node_modules/
        },  
        {
          test: /\.html$/,
          loader: "file?name=[name].[ext]",
          exclude: /node_modules/
        },
        { 
          test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$|\.woff$|\.ttf$/,
          loader: "file-loader",
          exclude: /node_modules/
        },
        {
          test: /\.(css|scss)$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
              use: [
                {loader:'css-loader?-url&sourceMap'},  //&localIdentName=css-module-[hash:base64]
                {loader:'sass-loader?sourceMap'}
              ]                 
            }),
            exclude: /node_modules/
        },  

      ],
  },
  
  plugins: [
//    new webpack.NoErrorsPlugin(),        

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV||'development')
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })    
  ]
}