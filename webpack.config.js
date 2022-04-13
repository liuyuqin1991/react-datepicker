/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const argv = require('yargs').argv;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isDev = argv.mode == 'development';

const devOption = {
	entry: path.resolve(__dirname, './example/src/index.tsx'),
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, './dist'),
		clean: true,
	},
};

const proOption = {
	entry: path.resolve(__dirname, './src/index.ts'),
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, './dist'),
		clean: true,
		library: {
			name: 'react-datepicker-ts',
			type: 'umd',
		},
	},
	externals: {
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: 'React',
    },
    'react-dom': {
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
      root: 'ReactDOM',
    },
  },
};

const baseOption = Object.assign({
	resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.scss'],
    alias: {
			'Src': path.resolve(__dirname, 'src/'),
			'Typing': path.resolve(__dirname, 'src/typing/'),
			'Scss': path.resolve(__dirname, 'src/scss/'),
			'Asset': path.resolve(__dirname, 'src/asset/'),
			'Hook': path.resolve(__dirname, 'src/hook/'),
    },
  },
	devtool: 'source-map',
	devServer: {
		static: './dist',
		port: 9000,
	},
	module: {
		rules: [
			{
				test: /\.(tsx|ts)$/,
				use: ['ts-loader'],
			},
			{
				test: /\.(scss|css)$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				test:/\.(ttf|woff|eot|woff2)$/i,
				type: 'asset'
			},
			{
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset'
      },
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './example/public/index.html'),
			filename: path.resolve(__dirname, './dist/index.html'),
		}),
	],
}, isDev ? devOption : proOption);

module.exports = baseOption;