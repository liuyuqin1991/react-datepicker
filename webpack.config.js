/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const argv = require('yargs').argv;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isDev = argv.mode == 'development';
const entryPath = isDev ? './example/src/index.tsx' : './src/index.ts';

module.exports = {
	entry: path.resolve(__dirname, entryPath),
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, './dist'),
		clean: true,
		library: {
			name: 'react-datepicker-ts',
			type: 'umd',
			umdNamedDefine: true,
			export: 'default',
		},
	},
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
	devtool: isDev ? 'inline-source-map' : false,
	devServer: {
		static: './dist',
		port: 9000,
	},
	module: {
		rules: [
			{
				test: /\.(tsx|ts)$/,
				use: ['ts-loader'],
				exclude: /node_modules/,
			},
			{
				test: /\.(scss|css)$/,
				use: [isDev ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test:/\.(ttf|woff|eot|woff2)$/i,
				type: 'asset/resource'
			},
			{
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './example/public/index.html'),
			filename: path.resolve(__dirname, './dist/index.html'),
			inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
      chunksSortMode: 'auto',
      isDev,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash:8].css',
			chunkFilename: 'css/[name].[chunkhash:8].css'
		}),
	]
};