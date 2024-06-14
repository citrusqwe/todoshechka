const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const config = require('./shared/config.js');
const webpack = require('webpack');

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash].css',
  }),
  new webpack.EnvironmentPlugin({
    MODE: 'development',
    STORAGE_KEY: 'todoshecki',
  }),
];

module.exports = merge(config, {
  mode: 'development',
  target: 'web',
  plugins,
  devtool: 'inline-source-map',
  output: {
    filename: '[name].[contenthash].js',
  },
});
