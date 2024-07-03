const { BUILD_DIR, ENTRY, SRC_DIR, PUBLIC_DIR } = require('./const');
const loaders = require('./loaders');
const plugins = require('./plugins');

const devServer = {
  static: {
    directory: PUBLIC_DIR,
  },
  compress: true,
  historyApiFallback: true,
  hot: true,
  port: 3000,
};

module.exports = {
  entry: ENTRY,
  output: {
    path: BUILD_DIR,
    filename: '[name].[contenthash].js',
    clean: true,
    publicPath: '/',
  },
  performance: {
    hints: false,
  },
  devtool: process.env.MODE === 'development' ? 'source-map' : undefined,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    preferAbsolute: true,
    modules: [SRC_DIR, 'node_modules'],
    mainFiles: ['index'],
    alias: {},
  },
  module: {
    strictExportPresence: true,
    rules: loaders,
  },
  plugins: plugins(),
  devServer,
};
