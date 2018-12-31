const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: './menu/public/.js',
  output: {
    filename: 'main.min.js',
    path: path.resolve(__dirname, 'dist', 'menu', 'build', 'static', 'js')
  },
  plugins: [
    new WriteFilePlugin({
      test: /content\.js$/,
    }),
    new HtmlWebpackPlugin({
      template: './src/popup/popup.html',
      filename: 'popup/popup.html',
      inject: false
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /src\/background/,
          /src\/menu/,
          /src\/popup/,
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
