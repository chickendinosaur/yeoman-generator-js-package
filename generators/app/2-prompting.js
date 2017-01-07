'use strict';

const fs = require('fs');

module.exports = function () {
	return this.prompt([{
		type: 'input',
		name: 'name',
		message: 'name:',
		default: this.pkg.name.length > 0 ? this.pkg.name : this.appname // Default to current folder name
	}, {
		type: 'input',
		name: 'version',
		message: 'version:',
		default: this.pkg.version,
		store: true
	}, {
		type: 'input',
		name: 'description',
		message: 'description:',
		default: this.pkg.description,
		store: true
	}, {
		type: 'input',
		name: 'main',
		message: 'main:',
		default: this.pkg.main,
		store: true
	}, {
		type: 'input',
		name: 'keywords',
		message: 'keywords:',
		default: this.pkg.keywords,
		filter: (input) => {
			// Check for duplicates.
			for (var i = 0; i < input.length; ++i) {
				if (this.pkg.keywords.indexOf(input[i]) < 0) {
					this.pkg.keywords.push(input[i]);
				}
			}

			return this.pkg.keywords;
		},
		store: true
	}, {
		type: 'input',
		name: 'authorName',
		message: 'author.name:',
		default: this.pkg.author.name
	}, {
		type: 'input',
		name: 'authorEmail',
		message: 'author.email:',
		default: this.pkg.author.email
	}, {
		type: 'input',
		name: 'authorURL',
		message: 'author.url:',
		default: this.pkg.author.url
	}, {
		type: 'list',
		name: 'license',
		message: 'license:',
		choices: fs.readdirSync(this.paths.licenseTemplates),
		default: this.pkg.license,
		store: true
	}, {
		type: 'input',
		name: 'repo',
		message: 'repository:',
		default: this.pkg.homepage
	}]).then((answers) => {
		this.pkg.name = answers.name;
		this.pkg.version = answers.version;
		this.pkg.description = answers.description;
		this.pkg.main = answers.main;
		this.pkg.keywords = answers.keywords;
		this.pkg.author.name = answers.authorName;
		this.pkg.author.email = answers.authorEmail;
		this.pkg.author.url = answers.authorURL;
		this.pkg.license = answers.license;
		this.pkg.homepage = answers.repo + '#readme';
		this.pkg.bugs.url = answers.repo + '/issues';
		this.pkg.repository.url = 'git+' + answers.repo + '.git';
	});
};
