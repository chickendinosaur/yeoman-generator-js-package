'use strict';

const arrayUnion = require('array-union');

module.exports = function () {
	this.paths = {
		pkg: this.destinationPath('package.json'),
		pkgTemplate: __dirname + '/templates/template-package.json',
		readme: this.destinationPath() + '/README.md',
		readmeTemplate: __dirname + '/templates/template-README.md',
		gitignore: this.destinationPath() + '/.gitignore',
		gitignoreTemplate: __dirname + '/templates/template-.gitignore',
		license: this.destinationPath() + '/LICENSE',
	};

	this.answers;

	// Populate answer from package.json
	var pkgTemplate = this.fs.readJSON(this.paths.pkgTemplate);

	if (this.fs.exists(this.paths.pkg)) {
		this.pkg = this.fs.readJSON(this.paths.pkg);
		assignDeep(this.pkg, pkgTemplate);
	} else {
		this.pkg = pkgTemplate;
	}

	if (!this.pkg.author || this.pkg.author.constructor !== Object) {
		this.pkg.author = {
			name: this.pkg.author,
			email: '',
			url: 'https://github.com/repoNamespace'
		};
	}

	this.pkg.homepage = this.pkg.homepage
		? this.pkg.homepage.split('#')[0]
		: 'https://github.com/repoNamespace/repoName';

	// Alter main if in sub directory for publishing lib.
	var mainFilePath = this.pkg.main.split('/')
	this.pkg.main = mainFilePath[mainFilePath.length - 1];

	// Dependency objects.
	this.pkg.peerDependencies = Object.assign(this.pkg.peerDependencies || {}, this.options.pkgPeerDependencies || {});
	this.pkg.dependencies = this.pkg.dependencies || {};
	this.pkg.devDependencies = this.pkg.devDependencies || {};

	// Merge scripts from sub-generators.
	this.pkg.scripts = Object.assign(this.pkg.scripts, {
		'build': 'npm run clean && babel src -d lib',
		'clean': 'rm -rf lib',
		'benchmark': 'babel-tape-runner benchmark/**/*.benchmark.js',
    'lint': 'eslint "src/**/*.{jsx,js}" --fix && eslint "stories/**/*.{jsx,js}" --fix && eslint "test/**/*.{jsx,js}" --fix',
    'prepublish': 'npm run test && npm run lint && npm run build',
		'test': 'babel-tape-runner test/**/*.spec.js | tap-spec'
	}, this.options.scripts || {});

  this.babel = this.options.babel || {
  	presets: [],
  	plugins: []
  };

	// Peer dependencies to install
	this.peerDependencies = arrayUnion([], this.options.peerDependencies || []);

	// dependencies to install
	this.dependencies = arrayUnion([], this.options.dependencies || []);

	// Development dependencies to install
	this.devDependencies = arrayUnion([
		'babel-cli',
    'babel-eslint',
    'babel-tape-runner',
		'benchmark',
    'tap-spec',
		'tape',
		'tapes',
		'eslint',
    'eslint-config-airbnb',
		'eslint-plugin-html',
    'eslint-plugin-import',
    'eslint-plugin-jsx-a11y@^5.0.0',
    'eslint-plugin-react'
	], this.options.devDependencies || []);
};

/**
Object.assign removes special characters that are needed for the pacakge name
and ruins the default value.
*/
function assignDeep(dest, source) {
	if (source && source.constructor === Object) {
		var sourceBaseKeys = Object.keys(source);

		for (var i = 0; i < sourceBaseKeys.length; ++i) {
			var sourceBaseKey = sourceBaseKeys[i];
			var destinationField = dest[sourceBaseKey];
			var sourceField = source[sourceBaseKey];

			if (destinationField === undefined) {
				dest[sourceBaseKey] = sourceField;
			} else {
				// Recursive assign.
				assignDeep(destinationField, sourceField);
			}
		}
	}
}
