var merge = require('webpack-merge');
var common = require('./webpack.config');

module.exports = merge(common, {
  mode: 'development',
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map'
});