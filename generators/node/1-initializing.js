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
	this.pkg.main = mainFilePath[mainFilePath.length -1];

	this.options.scripts = Object.assign({
		benchmark: 'cd src & for /R %i in (*.benchmark.js) do echo. & echo %i & echo. & babel %i | node',
		deploy: 'npm run test && npm run build && npm publish lib/',
		test: 'cd src & for /R %i in (*.spec.js) do babel %i | node | tap-spec'
	}, this.options.scripts || {});

	// Peer dependencies to install
	this.options.peerDependencies = arrayUnion([], this.options.peerDependencies || []);

	// dependencies to install
	this.options.dependencies = arrayUnion([], this.options.peerDependencies || []);

	// Development dependencies to install
	this.options.devDependencies = arrayUnion([
		'benchmark',
		'tape',
		'tapes',
		'tap-spec'
	], this.options.devDependencies || []);
};
