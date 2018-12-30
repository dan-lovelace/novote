const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /src\/background.js$/
        ]
      },
      {
        test: /manifest\.json$/,
        loader: 'file-loader',
        options: {
          name: 'manifest.json'
        }
      }
    ]
  }
}
