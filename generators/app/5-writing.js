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
	mkdirSync('data');

	// Create main files.
	var mainPath = this.pkg.main.split('/');
	if (mainPath[0].length === 0) {
		mainPath = 'index.js';
	}

	var fileNameExt = mainPath.pop();
	var fileNameExtFrags = fileNameExt.split('.');
	var fileExt = fileNameExtFrags.pop();
	var fileName = fileNameExtFrags.join('.');

	if (!this.fs.exists('src/' + fileNameExt)) {
		this.fs.copy(this.sourceRoot() + '/index.js', 'src/' + fileNameExt);
	}

	if (!this.fs.exists('benchmark/' + fileNameExt)) {
		this.fs.copy(this.sourceRoot() + '/index.benchmark.js', 'benchmark/' + fileNameExt);
	}

	var testFileNameExt = fileName + '.tap.' + fileExt;
	if (!this.fs.exists('test/' + testFileNameExt)) {
		this.fs.copy(this.sourceRoot() + '/index.tap.js', 'test/' + testFileNameExt);
	}

	// Update package.json field before write.
	// Add all commands for main package file.
	if (!fs.existsSync(this.paths.pkg)) {
		this.pkg.scripts.benchmark = 'npm run benchmark-' + fileName;
	}
	this.pkg.scripts['benchmark-' + fileName] = 'npm run test-' + fileName + ' && node benchmark/' + fileNameExt;
	this.pkg.scripts['build-' + fileName] = 'cp -f src/' + fileNameExt + ' lib/' + fileNameExt;
	this.pkg.scripts['test-' + fileName] = 'npm run build-' + fileName + ' && tap test/' + testFileNameExt + '  --reporter spec';

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
