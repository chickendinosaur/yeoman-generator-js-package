'use strict';

const fs = require('fs');

module.exports = function () {
	// Write in memory files.
	this.fs.writeJSON(this.paths.pkg, this.pkg);

	// Copy templates.
	if (!this.fs.exists('.gitignore')) {
		this.copy(this.paths.gitignoreTemplate, this.paths.gitignore);
	}

	if (!this.fs.exists('LICENSE')) {
		this.copy(this.paths.licenseTemplates + this.pkg.license, this.paths.license);
	}

	if (!this.fs.exists('README.md')) {
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
	this.spawnCommand('git', ['init']);

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

	writeFileSync('src/' + fileNameExt);
	writeFileSync('benchmark/' + fileNameExt);
	writeFileSync('test/' + fileName + '.tap.' + fileExt);
};

function mkdirSync(path) {
	if (!fs.existsSync(path)) {
		fs.mkdirSync(path);
	}
}

function writeFileSync(path) {
	if (!fs.existsSync(path)) {
		fs.writeFileSync(path);
	}
}
