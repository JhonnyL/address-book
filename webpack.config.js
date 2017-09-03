var webpack = require('webpack');
var path = require('path');

var sourcePath = path.join(__dirname, './src');
var outPath = path.join(__dirname, './dist');

var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: sourcePath,
  entry: ['babel-polyfill', './index.js'],
  output: {
    path: outPath,
    publicPath: '/',
    filename: 'bundle.js',
  },
  target: 'web',
  resolve: {
    extensions: ['.js'],
    modules: [ 'node_modules', sourcePath ]
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
      { test: /\.html$/, use: 'html-loader' },
    ],
  },
  target: 'web',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: Infinity
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html'
    })
  ],
  devServer: {
    contentBase: sourcePath,
    hot: true,
  },
  node: {
    fs: 'empty',
    net: 'empty'
  }
};
