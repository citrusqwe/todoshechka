const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const config = require('./shared/config.js');
const webpack = require('webpack');

const plugins = [
  new MiniCssExtractPlugin({
    filename: '[contenthash].css',
  }),
  new webpack.EnvironmentPlugin({
    MODE: 'production',
    STORAGE_KEY: 'todoshecki',
  }),
];

module.exports = merge(config, {
  mode: 'production',
  target: 'browserslist',
  plugins,
  devtool: false,
  output: {
    filename: '[fullhash].js',
  },
  optimization: {
    usedExports: false,
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          compress: true,
          output: {
            beautify: true,
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
});
