'use strict';

const arrayUnion = require('array-union');

module.exports = function () {
	this.options.scripts = Object.assign({
		benchmark: 'cd src & for %i in (*.benchmark.js) do echo. & echo %i & echo. & browserify -t babelify %i | browser-run',
		test: 'cd src & for /R %i in (*.spec.js) do browserify -t babelify %i | tap-closer | browser-run | tap-spec'
	}, this.options.scripts || {});

	// Peer dependencies to install
	this.options.peerDependencies = arrayUnion([], this.options.peerDependencies || []);

	// dependencies to install
	this.options.dependencies = arrayUnion([], this.options.peerDependencies || []);

	// Development dependencies to install
	this.options.devDependencies = arrayUnion([
		'tap-closer',
		'browserify',
		'babelify',
		'browser-run'
	], this.options.devDependencies || []);
};
