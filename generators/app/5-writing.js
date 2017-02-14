'use strict';

const fs = require('fs');

module.exports = function () {
	// Copy templates.
	if (!this.fs.exists(this.paths.gitignore)) {
		this.fs.copy(this.paths.gitignoreTemplate, this.paths.gitignore);
	}

	if (!this.fs.exists(this.destinationPath() + '/.babelrc')) {
		this.fs.copy(this.sourceRoot() + '/.babelrc', this.destinationPath() + '/.babelrc');
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

	// Create main files.
	var mainFilename = 'src/' + this.pkg.main.split('/')[1];

	if (!this.fs.exists(mainFilename)) {
		this.fs.copy(this.sourceRoot() + '/' + mainFilename, 'src/index.js');
	}

	var benchmarkFilename = mainFilename.replace('.js', '.benchmark.js');
	if (!this.fs.exists('src/index.benchmark.js')) {
		this.fs.copy(this.sourceRoot() + '/' + benchmarkFilename, benchmarkFilename);
	}

	var testFilename = mainFilename.replace('.js', '.spec.js');
	if (!this.fs.exists(testFilename)) {
		this.fs.copy(this.sourceRoot() + '/' + testFilename, testFilename);
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
