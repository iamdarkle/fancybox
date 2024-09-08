const { merge } = require('webpack-merge');
const flarumWebpackConfig = require('flarum-webpack-config');

module.exports = merge(flarumWebpackConfig(), {
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Add this rule to handle CSS files
      },
    ],
  },
});
