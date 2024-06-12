const webpack = require('webpack');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { PUBLIC_DIR } = require('./const');
const path = require('path');

module.exports = (options = {}) =>
  [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(PUBLIC_DIR, 'index.html'),
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
      chunkFilename: 'css/[name].[contenthash:8].css',
    }),
    new webpack.EnvironmentPlugin({
      MODE: options.mode || 'development',
    }),
    new webpack.HotModuleReplacementPlugin(),
    process.env.IS_DEV && new ReactRefreshPlugin({ overlay: false }),
  ].filter(Boolean);
