const { resolve } = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (options = {}) => {
  const { rootDir } = options;

  if (!rootDir) {
    throw '[@grapgrap/webpack-config]: No provided `rootDir`';
  }

  return {
    entry: {
      main: './src/index.tsx',
    },
    output: {
      path: resolve(rootDir, '/dist'),
      filename: '[name].[contenthash].js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|ts)x?$/,
          exclude: /node_modules/,
          use: require.resolve('babel-loader'),
        },
        {
          test: /\.(png|jpg|gif|svg|woff2|ttf|eot|woff)$/i,
          use: {
            loader: require.resolve('url-loader'),
            options: {
              limit: 10000,
              name: 'static/[name].[contenthash].[ext]',
            },
          },
        },
        {
          test: /\.css$/,
          use: [require.resolve('style-loader'), require.resolve('css-loader')],
        },
      ],
    },
    resolve: {
      modules: [resolve(rootDir), 'node_modules'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: resolve(rootDir, 'public/index.html'),
        minify: {
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        automaticNameDelimiter: '__',
      },
      runtimeChunk: true,
    },
  };
};
