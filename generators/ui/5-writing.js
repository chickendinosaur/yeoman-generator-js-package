'use strict';

const fs = require('fs');

module.exports = function () {
	// Directories.

	if (!fs.existsSync('src')) {
		fs.mkdirSync('src');
	}

	if (!fs.existsSync('src/styles')) {
		fs.mkdirSync('src/styles');
	}

	// Files.

	if (!fs.existsSync(this.destinationPath('example'))) {
		this.fs.copy(
			this.templatePath('example'),
			this.destinationPath('example'), {
				globOptions: { dot: true }
			}
		);
	}

	if (!fs.existsSync(this.destinationPath('webpack.config.js'))) {
		this.fs.copy(
			this.templatePath('webpack.config.js'),
			this.destinationPath('webpack.config.js'), {
				globOptions: { dot: true }
			}
		);
	}

};
