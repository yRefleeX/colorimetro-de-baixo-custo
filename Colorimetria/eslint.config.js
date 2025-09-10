  // https://docs.expo.dev/guides/using-eslint/
  const { defineConfig } = require('eslint/config');
  const expoConfig = require('eslint-config-expo/flat');

  module.exports = defineConfig([
    expoConfig,
    {
      rules: {
        'import/no-unresolved': 'error',
      },
      settings: {
        'import/resolver': {
          typescript: {},
          node: {
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
        },
      },
    },
    {
      ignores: ['dist/*', '.expo/*', 'node_modules/*'],
    },
  ]);
