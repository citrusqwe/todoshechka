const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = [
  {
    test: /\.([jt]s|[jt]sx)?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        cacheDirectory: true,
      },
    },
  },
  { test: /\.tsx?$/, use: 'ts-loader', exclude: '/node_modules/' },
  {
    test: /\.css$/i,
    use: [
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: {
          esModule: true,
          modules: {
            localIdentName: '[name]__[local]__[hash:base64:5]',
            namedExport: true,
          },
        },
      },
    ],
  },
  {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  },
  {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },
];
