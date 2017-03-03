'use strict';

const fs = require('fs');

module.exports = function () {
	this.fs.copy(__dirname + '/templates/.csscomb.json', this.destinationPath() + '/.csscomb.json');

	if (!fs.existsSync(this.destinationPath('example'))) {
		this.fs.copy(this.templatePath('example'), this.destinationPath('example'), {
			globOptions: {
				dot: true
			}
		});
	}

	if (!fs.existsSync(this.destinationPath('webpack.config.js'))) {
		this.fs.copy(this.templatePath('webpack.config.js'), this.destinationPath('webpack.config.js'), {
			globOptions: {
				dot: true
			}
		});
	}
};
