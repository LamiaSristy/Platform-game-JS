const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: {
    app: './src/index.js',
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js',
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'index.html'), to: path.resolve(__dirname, 'build') },
        { from: path.resolve(__dirname, 'assets'), to: path.resolve(__dirname, 'build/assets') },
      ],
    }),

    new webpack.DefinePlugin({
      'typeof CANVAS_RENDERER': JSON.stringify(true),
      'typeof WEBGL_RENDERER': JSON.stringify(true),
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
  },
};
