const common = require('./common');
const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');

module.exports = (options = {}) => {
  return merge(common(options), {
    mode: 'production',
    plugins: [
      new Dotenv({
        path: './.env.prod',
        safe: './.env.example',
      }),
    ],
  });
};
