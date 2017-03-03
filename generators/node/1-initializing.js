'use strict';

const arrayUnion = require('array-union');

module.exports = function () {
	// Populate answer from package.json
	if (this.fs.exists(this.destinationPath('package.json'))) {
		this.pkg = this.fs.readJSON(this.destinationPath('package.json'));
	} else {
		this.pkg = {};
	}

	// Alter main if in sub directory for publishing lib.
	var mainFilePath = this.pkg.main.split('/')
	this.pkg.main = mainFilePath[mainFilePath.length - 1];

	// Scripts on top of base generator.
	this.options.scripts = Object.assign({
		"build": "npm run clean && babel src -d lib --ignore *.*.js && cp package.json lib & cp README.md lib & cp LICENSE lib",
		"clean": "rm -rf lib",
		benchmark: 'tape src/**/*.benchmark.js',
		deploy: 'npm run test && npm run build && npm publish lib/',
		test: 'tape src/**/*.test.js | tap-spec'
	}, this.options.scripts || {});

	// Peer dependencies to install
	this.options.peerDependencies = arrayUnion([], this.options.peerDependencies || []);

	// dependencies to install
	this.options.dependencies = arrayUnion([], this.options.peerDependencies || []);

	// Development dependencies to install
	this.options.devDependencies = arrayUnion([
		'babel-cli',
		'babel-plugin-transform-es2015-modules-commonjs',
		'benchmark',
		'tape',
		'tapes',
		'tap-spec'
	], this.options.devDependencies || []);
};
