const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin({
      test: /\.js$/,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
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
        loader: 'babel-loader'
      }
    ]
  }
}
