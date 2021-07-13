module.exports = {
  root: true,
  env: {
    node: true,
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-empty': 'off',
  },
};
