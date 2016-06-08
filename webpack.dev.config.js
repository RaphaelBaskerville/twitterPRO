var path = require('path');


module.exports = {
  devtool:'eval',

  entry: [
    './public/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel'
    }]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};