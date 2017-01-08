'use strict';

const fs = require('fs');
const execSync = require('child_process').execSync;

module.exports = function () {
	// Write in memory files.
	this.fs.writeJSON(this.paths.pkg, this.pkg);

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
	if (!this.fs.exists('test/' + fileName + '.tap.' + fileExt)) {
		this.fs.copy(this.sourceRoot() + '/index.tap.js', 'test/' + fileName + '.tap.' + fileExt);
	}
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
