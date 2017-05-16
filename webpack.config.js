'use strict';

const path = require('path');

module.exports = {
  entry: './components/app/app.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: "inline-source-map",
  watch: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  devServer: {
    contentBase: __dirname,
    compress: true,
    port: 9000
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: 'pug-loader'
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] },
        }],
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      }
    ]
  }
}