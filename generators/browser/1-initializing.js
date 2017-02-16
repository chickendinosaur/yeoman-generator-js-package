'use strict';

const arrayUnion = require('array-union');

module.exports = function () {
	this.options.scripts = Object.assign({
		benchmark: 'cd src & for %i in (*.benchmark.js) do echo. & echo %i & echo. & browserify -t babelify %i | browser-run',
		build: 'npm run clean && babel src -d build && babel build -d lib --ignore *.*.js && cp package.json lib & cp README.md lib & cp LICENSE lib',
		clean: 'rm -rf lib && rm -rf build',
		deploy: 'npm run test &&  npm run build && npm publish lib/',
		test: 'cd src & for /R %i in (*.spec.js) do browserify -t babelify %i | tap-closer | browser-run | tap-spec'
	}, this.options.scripts);

	// Peer dependencies to install
	this.options.peerDependencies = arrayUnion([], this.options.peerDependencies);

	// dependencies to install
	this.options.dependencies = arrayUnion([], this.options.peerDependencies);

	// Development dependencies to install
	this.options.devDependencies = arrayUnion([
		'tap-closer',
		'browserify',
		'babelify',
		'browser-run'
	], this.option.devDependencies);
};
