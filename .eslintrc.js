const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  env: {
    es6: true,
    commonjs: true,
    browser: true,
  },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	plugins: [
		'react',
		'@typescript-eslint'
	],
	rules: {
		'camelcase': [0, { ignoreDestructuring: true }],
		'no-debugger': isDev ? 0 : 2,
		'no-console': isDev ? [1, { allow: ['warn', 'error', 'log'] }] : [2, { allow: ['warn', 'error'] }],
		'class-methods-use-this': 0,
		'react/no-multi-comp': 0,
		'import/no-extraneous-dependencies': 0,
		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/anchor-is-valid': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'jsx-a11y/no-noninteractive-element-interactions': 0,
		'react/jsx-props-no-spreading': 0,
		'react/prop-types': 0,
		'no-param-reassign': ['error', { 'props': false }],
		'no-plusplus': 'error',
		'no-return-assign': 'error',
		'@typescript-eslint/no-unused-vars': isDev ? 0 : ['error'],
		'no-unused-vars': isDev ? 0 : 'error',
		'prefer-default-export': 0,
		'react/no-array-index-key': 0,
		'import/no-named-as-default': 0,
	},
	globals: {
		'process': true,
		'__dirname': true,
	},
}
