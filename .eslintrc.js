const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  env: {
    es6: true,
    commonjs: true,
    browser: true,
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    strict: ['error', 'global'],
    'prettier/prettier': ['error', { singleQuote: true }],
    // 注释限制，注释需包含前导空格
    'spaced-comment': ['error', 'always'],
    // 多行注释规则，限制格式为starred-block
    'multiline-comment-style': ['error', 'starred-block'],
    // 强制驼峰命名规定，不检查解构的标识符
    camelcase: [0, { properties: 'always', ignoreDestructuring: true }],
    // 禁止debugger代码
    'no-debugger': isDev ? 0 : 2,
    // 禁止console代码
    'no-console': isDev
      ? [1, { allow: ['warn', 'error', 'log'] }]
      : [2, { allow: ['warn', 'error'] }],
  },
  globals: {
    process: true,
    __dirname: true,
  },
};
