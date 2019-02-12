module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/prettier'
  ],
  rules: {
    'no-console': ["error", { allow: [ "error"] }],
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-closing-bracket-newline': ["error", {
      "multiline": "always"
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}