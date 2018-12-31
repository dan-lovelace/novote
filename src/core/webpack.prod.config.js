const path = require('path');

module.exports = {
  entry: {
    content: './src/content_scripts/index.js',
    background: './src/background/index.js'
  },
  output: {
    filename: 'bundle.[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /src\/\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env', 'stage-2']
        },
      },
    ],
  },
};
