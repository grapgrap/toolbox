module.exports = {
  '**/*.ts?(x)': () => ['tsc -p tsconfig.json --noEmit', 'eslint --cache --fix', 'prettier --write'],
};
