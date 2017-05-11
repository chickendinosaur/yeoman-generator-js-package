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

	// Set files.
	this.pkg.files = ['**/*.js'];

	// Dependency objects.
	this.pkg.peerDependencies = this.pkg.peerDependencies || {};
	this.pkg.dependencies = this.pkg.dependencies || {};
	this.pkg.devDependencies = this.pkg.devDependencies || {};

	// Merge scripts from sub-generators.
	this.pkg.scripts = Object.assign(this.pkg.scripts, {
		"build": "npm run clean && babel src -d lib --ignore *.*.js* && cp package.json lib & cp README.md lib & cp LICENSE lib",
		"clean": "rm -rf lib",
		benchmark: 'babel-tape-runner benchmark/**/*.benchmark.js',
		deploy: "npm run test && eslint src --fix && eslint example --fix && npm run build && npm publish lib",
		test: 'babel-tape-runner test/**/*.spec.js | tap-spec'
	}, this.options.scripts || {});

	// Peer dependencies to install
	this.peerDependencies = arrayUnion([], this.options.peerDependencies || []);

	// dependencies to install
	this.dependencies = arrayUnion([], this.options.peerDependencies || []);

	// Development dependencies to install
	this.devDependencies = arrayUnion([
		'babel-cli',
    'babel-plugin-transform-imports',
    'babel-tape-runner',
		'benchmark',
		'tape',
		'tapes',
		'tap-spec',
		"eslint",
		"eslint-plugin-html",
    "eslint-plugin-import",
    "eslint-config-airbnb-base"
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
