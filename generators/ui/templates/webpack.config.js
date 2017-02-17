const webpack = require('webpack');

module.exports = {
	devtool: 'eval',
	devServer: {
		contentBase: __dirname + '/example',
		publicPath: '/public',
		open: true,
		historyApiFallback: true,
		hot: true,
		inline: true,
		clientLogLevel: 'none',
	},
	entry: [
		__dirname + '/example/app/index.js',
		'webpack/hot/only-dev-server'
	],
	output: {
		filename: 'app/index.js'
	},
	module: {
		rules: [
			{
				test: /\.js$|\.jsx$/,
				use: [
					'babel-loader'
				]
			}, {
				test: /\.css$|\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}, {
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/icons/[name].[ext]'
						}
					}
				]
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin()
	],
	resolve: {
		extensions: [
			'.js',
			'.jsx',
			'.json',
			'.css',
			'.scss',
			'.html'
		],
		mainFields: [
			'browser',
			'jsnext:main',
			'main'
		]
	}
};
