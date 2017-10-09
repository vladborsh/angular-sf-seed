const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './public/app.js',
  output: {
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'dest')
  },
  module: {
    loaders: [
      { test: /\.js/, exclude: [/app\/lib/, /node_modules/], loader: 'babel-loader' },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.(scss|sass)$/, loader: 'sass-loader' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },
  stats: {
    colors: true
  },
  plugins: [],
  devtool: 'source-map'
};