module.exports = {
  extends: [
    'standard',
    'plugin:vue/recommended',
    'plugin:markdown'
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
  overrides: [
    {
      files: ['**/*.md'],
      processor: 'markdown/markdown'
    },
    {
      files: ['**/*.md/*.js'],
      parserOptions: {
        ecmaFeatures: {
          impliedStrict: true
        }
      },
      rules: {
        'lines-around-comment': 'off'
      }
    }
  ]
};
