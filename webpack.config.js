const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-hot-middleware/client',
    './src/index.js'
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /src\/background.js$/
        ],
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    ]
  }
}
