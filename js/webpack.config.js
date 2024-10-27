const config = require('flarum-webpack-config');
const { merge } = require('webpack-merge');

const CopyPlugin = require('copy-webpack-plugin');

const customConfig = {
  plugins: [
      new CopyPlugin({
          patterns: [
              { from: './node_modules/@fancyapps/ui/dist/fancybox/fancybox.css', to: '../../less' },
              { from: './node_modules/@fancyapps/ui/dist/carousel/carousel.css', to: '../../less' }
          ]
      })
  ]
};

module.exports = merge(config(), customConfig);
