'use strict';

const fs = require('fs');
const execSync = require('child_process').execSync;

module.exports = function () {
	// Copy templates.
	if (!this.fs.exists(this.paths.gitignore)) {
		this.fs.copy(this.paths.gitignoreTemplate, this.paths.gitignore);
	}

	if (!this.fs.exists(this.paths.license)) {
		this.fs.copy(this.paths.licenseTemplates + this.pkg.license, this.paths.license);
	}

	if (!this.fs.exists(this.paths.readme)) {
		this.fs.copyTpl(
			this.paths.readmeTemplate,
			this.paths.readme, {
				packageName: this.pkg['generator-module'].global ? this.pkg.name + ' -g' : this.pkg.name,
				description: this.pkg.description,
				license: this.fs.read(this.paths.license)
			}
		);
	}

	// Create folder structure.
	mkdirSync('src');
	mkdirSync('benchmark');
	mkdirSync('lib');
	mkdirSync('test');

	// Create main files.
	if (!this.fs.exists('src/index.js')) {
		this.fs.copy(this.sourceRoot() + '/src/index.js', 'src/index.js');
	}

	if (!this.fs.exists('src/some-module.js')) {
		this.fs.copy(this.sourceRoot() + '/src/some-module.js', 'src/some-module.js');
	}

	if (!this.fs.exists('benchmark/some-module.benchmark.js')) {
		this.fs.copy(this.sourceRoot() + '/benchmark/some-module.benchmark.js', 'benchmark/some-module.benchmark.js');
	}

	if (!this.fs.exists('test/some-module.js')) {
		this.fs.copy(this.sourceRoot() + '/test/some-module.tap.js', 'test/some-module.tap.js');
	}

	// Sort scripts.
	this.pkg.scripts = generatedSortedObject(this.pkg.scripts);

	// Write in memory files.
	this.fs.writeJSON(this.paths.pkg, this.pkg);
};

function mkdirSync(path) {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
}

function writeFileSync(path, data, overwrite) {
	if (!fs.existsSync(path) || overwrite) {
		fs.writeFileSync(path, data);
	}
}

function generatedSortedObject(obj) {
	var scriptKeys = Object.keys(obj);
	var newObj = {};

	scriptKeys.sort();

	for (var i = 0; i < scriptKeys.length; i++) {
		var scriptKey = scriptKeys[i];
		newObj[scriptKey] = obj[scriptKey];
	}

	return newObj;
}
