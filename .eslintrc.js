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
      // override block for markdown files & markdown code
      files: ['**/*.md'],
      processor: 'markdown/markdown'
    },
    {
      // override block for javascript code inside of js code fences ( ```js )
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
