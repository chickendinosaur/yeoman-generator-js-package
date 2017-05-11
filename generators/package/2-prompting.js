'use strict';

module.exports = function () {
	return this.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'name:',
			default: this.pkg.name.length > 0
				? this.pkg.name
				: 'package'
		}, {
			type: 'input',
			name: 'version',
			message: 'version:',
			default: this.pkg.version
		}, {
			type: 'input',
			name: 'description',
			message: 'description:',
			default: this.pkg.description
		}, {
			type: 'input',
			name: 'keywords',
			message: 'keywords:',
			default: this.pkg.keywords,
			filter: (input) => {
				if (input.constructor === String) {
					input = input.split(',');
				}

				// Check for duplicates.
				for (var i = 0; i < input.length; ++i) {
					var keyword = input[i].trim();
					if (this.pkg.keywords.indexOf(keyword) < 0) {
						this.pkg.keywords.push(keyword);
					}
				}

				return this.pkg.keywords.sort();
			}
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
			choices: ['MIT'],
			default: this.pkg.license
		}, {
			type: 'input',
			name: 'repo',
			message: 'repository:',
			default: this.pkg.homepage
		}, {
			type: 'list',
			name: 'publishable',
			message: 'publishable:',
			choices: ['true', 'false'],
			default: (!this.pkg.private).toString()
		}
	]).then((answers) => {
		this.answers = answers;

		this.pkg.name = answers.name;
		this.pkg.version = answers.version;
		this.pkg.description = answers.description;
		this.pkg.keywords = answers.keywords;
		this.pkg.author.name = answers.authorName;
		this.pkg.author.email = answers.authorEmail;
		this.pkg.author.url = answers.authorURL;
		this.pkg.license = answers.license;
		this.pkg.homepage = answers.repo + '#readme';
		this.pkg.bugs.url = answers.repo + '/issues';
		this.pkg.repository.url = 'git+' + answers.repo + '.git';
		this.pkg.private = answers.publishable === 'true' ? false : true;
	});
};
