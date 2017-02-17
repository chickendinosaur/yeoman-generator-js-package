'use strict';

const arrayUnion = require('array-union');

module.exports = function () {
	this.options.scripts = Object.assign({
		deploy: 'npm run build && npm publish lib/',
		start: 'webpack-dev-server'
	}, this.options.scripts || {});

	// Peer dependencies to install
	this.options.peerDependencies = arrayUnion([], this.options.peerDependencies || []);

	// dependencies to install
	this.options.dependencies = arrayUnion([], this.options.peerDependencies || []);

	// Development dependencies to install
	this.options.devDependencies = arrayUnion([
		'webpack',
		'webpack-dev-server',
		'node-sass',
		'babel-loader',
		'sass-loader',
		'file-loader',
		'css-loader',
		'style-loader'
	], this.options.devDependencies || []);
};
