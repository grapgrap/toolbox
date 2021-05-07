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

  const targets = Object.fromEntries(
    [
      ['node', options.target === 'node' || isTest ? 'current' : undefined][
        ('browser', options.target === 'browser' ? 'default ie 11' : undefined)
      ],
    ].filter((key, value) => Boolean(value))
  );
  const presets = [env, react, typescript].filter(Boolean);
  const plugins = [styledComponents, reactRefresh].filter(Boolean);

  return { root: true, targets, presets, plugins };
};
