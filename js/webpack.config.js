const config = require('flarum-webpack-config');
const { merge } = require('webpack-merge');

const customConfig = {
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

module.exports = merge(config(), customConfig);
