/**
 * @param api - babel context
 * @param {object} options
 * @param {'node'|'browser'} [options.target='browser']
 * @param {boolean} [options.react=true]
 */

module.exports = (api, options = { target: 'browser', react: true }) => {
  const envName = api.env();
  const isDev = envName === 'development';
  const isProd = envName === 'production';
  const isTest = envName === 'test';

  const env = [
    require.resolve('@babel/preset-env'),
    {
      useBuiltIns: 'usage',
      corejs: 3,
      shippedProposals: true,
    },
  ];

  const react = options.react ? [require.resolve('@babel/preset-react'), { runtime: 'automatic' }] : undefined;

  const typescript = require.resolve('@babel/preset-typescript');

  const styledComponents = options.react
    ? [require.resolve('babel-plugin-styled-components'), { pure: true, displayName: !isProd }]
    : undefined;

  const reactRefresh = options.react && isDev ? 'react-refresh/babel' : undefined;

  const targets = [
    options.target === 'node' || isTest ? 'node current' : undefined,
    options.target === 'browser' ? 'default ie 11' : undefined,
  ].filter(Boolean);
  const preset = [env, react, typescript].filter(Boolean);
  const plugin = [styledComponents, reactRefresh].filter(Boolean);

  return { targets, preset, plugin };
};
