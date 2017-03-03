'use strict';

module.exports = function () {
	// Create main files.
	var mainFilePath = 'src/' + this.pkg.main || 'index.js';
	
	if (!this.fs.exists(this.destinationPath(mainFilePath).replace('.js', '.benchmark.js'))) {
		this.fs.copy(
			this.templatePath('src/index.benchmark.js'),
			this.destinationPath(mainFilePath.replace('.js', '.benchmark.js'))
		);
	}
	
	if (!this.fs.exists(this.destinationPath(mainFilePath).replace('.js', '.test.js'))) {
		this.fs.copy(
			this.templatePath('src/index.test.js'),
			this.destinationPath(mainFilePath.replace('.js', '.test.js'))
		);
	}
};
