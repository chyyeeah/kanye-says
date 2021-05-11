const path = require('path');

module.exports = {
  entry: path.resolve('client/src/index.jsx'),
  output: {
    path: path.resolve('client/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: '/node_modules',
        loader: 'babel-loader',
        options: {
          presets: [ '@babel/preset-react', '@babel/preset-env' ]
        }
      }
    ]
  },
  cache: false
};