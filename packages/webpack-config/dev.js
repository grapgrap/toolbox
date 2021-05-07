const common = require('./common');
const Dotenv = require('dotenv-webpack');
const { merge } = require('webpack-merge');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');

module.exports = (options = {}) => {
  return merge(common(options), {
    mode: 'development',
    devtool: 'inline-source-map',
    plugins: [
      new Dotenv({
        path: './.env.dev',
        safe: './.env.example',
        allowEmptyValues: true,
      }),
      new HotModuleReplacementPlugin(),
      new ReactRefreshWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin({
        typescript: {
          diagnosticOptions: {
            semantic: true,
            syntactic: true,
          },
        },
      }),
    ],

    devServer: {
      host: '0.0.0.0',
      port: 3000,
      compress: true,
      hot: true,
      overlay: true,
      historyApiFallback: true,
      stats: 'errors-only',
    },
  });
};
