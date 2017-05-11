'use strict';

const fs = require('fs');

module.exports = function () {
	// Create folder structure.
	mkdirSync('src');

	// Copy templates.
	this.fs.copy(this.paths.gitignoreTemplate, this.paths.gitignore);

	if (!this.fs.exists(this.destinationPath() + '/.babelrc')) {
		this.fs.copy(__dirname + '/templates/template-.babelrc', this.destinationPath() + '/.babelrc');
	}

	this.fs.copy(__dirname + '/templates/template-.eslintrc.json', this.destinationPath() + '/.eslintrc.json');

	if (!this.fs.exists(this.paths.license)) {
		this.fs.copy(__dirname + '/template-license-' + this.pkg.license.toLowerCase(), this.paths.license);
	}

	if (!this.fs.exists(this.paths.readme)) {
		var repositorySplit = this.pkg.repository.url.split('/');
		this.fs.copyTpl(this.paths.readmeTemplate, this.paths.readme, {
			repo: this.pkg.repository.url.replace('git+', ''),
			repoName: repositorySplit[repositorySplit.length - 1].replace('.git', ''),
			packageName: this.pkg.name,
			description: this.pkg.description,
			license: this.fs.read(this.paths.license)
		});
	}

	// Create main files.
	if (!this.fs.exists(this.destinationPath('src/' + this.pkg.main))) {
		this.fs.copy(this.templatePath('template-index.js'), this.destinationPath('src/' + this.pkg.main));
	}

	if (!this.fs.exists(this.destinationPath('benchmark')) &&
		!this.fs.exists(this.destinationPath('benchmark/' + this.pkg.main).replace('.js', '.benchmark.js'))) {
		mkdirSync('benchmark');
		this.fs.copy(this.templatePath('template-index.benchmark.js'),
			this.destinationPath(('benchmark/' + this.pkg.main).replace('.js', '.benchmark.js')));
	}

	if (!this.fs.exists(this.destinationPath('test')) &&
		!this.fs.exists(this.destinationPath('test/' + this.pkg.main).replace('.js', '.spec.js'))) {
		mkdirSync('test');
		this.fs.copy(this.templatePath('template-index.spec.js'),
			this.destinationPath(('test/' + this.pkg.main).replace('.js', '.spec.js')));
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
