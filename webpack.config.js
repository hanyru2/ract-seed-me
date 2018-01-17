var path = require('path')

var config = {
  devtool: 'cheap-module-eval-source-map',
  entry: './src/client.js',
  output: {
    path: path.resolve(__dirname, 'public/build'),
    filename: 'client.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loaders: [
          'react-hot',
          'babel?presets[]=react,presets[]=es2015,presets[]=stage-0'
        ]
      }
    ]
  }
}

module.exports = config
