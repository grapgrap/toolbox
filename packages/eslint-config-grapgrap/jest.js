module.exports = {
  overrides: {
    files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
    extends: ['plugin:jest/recommended', 'plugin:testing-library/react'],
    env: {
      'jest/globals': true,
    },
  },
};
