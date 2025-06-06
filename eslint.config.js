module.exports = [
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    ignores: ['node_modules/**', 'dist/**'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: { ecmaVersion: 2020, sourceType: 'module' },
    },
    plugins: {
      react: require('eslint-plugin-react'),
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
  },
];
