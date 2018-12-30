const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new WriteFilePlugin({
      test: /index\.js$/,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /src\/background.js$/,
          /node_modules/
        ],
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env', 'react', 'stage-2']
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            // creates style nodes from JS strings
            loader: "style-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // translates CSS into CommonJS
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            // compiles Sass to CSS
            loader: "sass-loader",
            options: {
              outputStyle: 'expanded',
              sourceMap: true,
              sourceMapContents: true
            }
          }
        ]
      },
    ]
  }
}
