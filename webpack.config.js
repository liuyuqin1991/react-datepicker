const path = require('path');
const argv = require('yargs').argv;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const entryPath = argv.mode == 'development' ? "./example/src/index.tsx" : "./src/index.tsx";

module.exports = {
	entry: path.resolve(__dirname, entryPath),
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, './dist'),
		libraryTarget: 'umd',
		umdNamedDefine: true
	},
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
		port: 9000,
	},
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{
				test: /\.(tsx|ts)$/,
				use: ['ts-loader']
			},
			{
				test: /\.(scss|css)$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
			},
			{
				test: /\.(woff)|(ttf)$/,
				type: 'asset/font'
			},
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './example/public/index.html'),
			filename: path.resolve(__dirname, './dist/index.html'),
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[chunkhash:8].css',
			chunkFilename: 'css/[name].[chunkhash:8].css'
		}),
	]
};