module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/typescript/recommended',
    '@vue/airbnb',
  ],
  plugins: [
    'sort-imports-es6-autofix',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'sort-imports-es6-autofix/sort-imports-es6': ['error', {
      ignoreCase: false,
      ignoreMemberSort: false,
      memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single']
    }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true}],
    "no-param-reassign": 0,
    'vue/html-indent': ['error', 2, {
      'baseIndent': 1
    }],
    'max-len': ["error", { "code": 300 }]
  },
};
