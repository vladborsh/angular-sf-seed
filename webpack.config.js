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
      { test: /\.js$/, loader: 'babel-loader', query: { presets: ['es2015'] } },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.(scss|sass)$/, loader: 'style!css!sass' },
      { test: /\.css$/, loader: 'style!css' }
    ]
  },
  stats: {
    colors: true
  },
  plugins: [new HtmlWebpackPlugin()],
  devtool: 'source-map'
};