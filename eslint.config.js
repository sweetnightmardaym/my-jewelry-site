module.exports = [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
    },
    plugins: {
      react: require('eslint-plugin-react'),
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];
