const { dev } = require('@grapgrap/webpack-config');
const { merge } = require('webpack-merge');

module.exports = dev({
  rootDir: __dirname,
});
