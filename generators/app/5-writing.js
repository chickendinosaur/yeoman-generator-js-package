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
				packageName: this.pkg.module.global ? this.pkg.name + ' -g' : this.pkg.name,
				description: this.pkg.description,
				license: this.fs.read(this.paths.license)
			}
		);
	}

	// Init git repo.
	if (!fs.existsSync('.git')) {
		execSync('git init');
		execSync('git remote add origin ' + this.answers.repo);
	}

	// Create folder structure.
	mkdirSync('src');
	mkdirSync('benchmark');
	mkdirSync('lib');
	mkdirSync('test');

	// Create main files.
	if (!this.fs.exists('src/index.js')) {
		this.fs.copy(this.sourceRoot() + '/index.js', 'src/index.js');
	}

	if (!this.fs.exists('benchmark/index.js')) {
		this.fs.copy(this.sourceRoot() + '/index.benchmark.js', 'benchmark/index.js');
	}

	if (!this.fs.exists('benchmark/module.benchmark.js')) {
		this.fs.copy(this.sourceRoot() + '/module.benchmark.js', 'benchmark/module.benchmark.js');
	}

	if (!this.fs.exists('test/moduleSpec.js')) {
		this.fs.copy(this.sourceRoot() + '/moduleSpec.tap.js', 'test/moduleSpec.tap.js');
	}

	// Update package.json field before write.
	// Add all commands for main package file.
	if (!fs.existsSync(this.paths.pkg)) {
		this.pkg.scripts.benchmark = 'npm run test && node benchmark';
		this.pkg.scripts['benchmark-module'] = 'npm run test-module && node benchmark/module.benchmark.js';
		this.pkg.scripts['build-module'] = 'cp -f src/index.js lib/index.js';
		this.pkg.scripts['test-module'] = 'npm run build-module && tap test/moduleSpec.tap.js --reporter spec';
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
