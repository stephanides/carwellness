var merge = require('webpack-merge');
var common = require('./webpack.config');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new UglifyJSPlugin({
      uglifyOptions: {
        output: {
          comments: false,
          beautify: false
        },
        compress: {
          drop_console: true,
          passes: 3
        }
      },
      parallel: true
    })
  ]
});