const path = require('path');

module.exports = {
  BUILD_DIR: path.resolve(__dirname, '../../', 'build'),
  PUBLIC_DIR: path.resolve(__dirname, '../../', 'public'),
  SRC_DIR: path.resolve(__dirname, '../../', 'src'),
  ENTRY: path.join(__dirname, '../../src', 'index.tsx'),
};
