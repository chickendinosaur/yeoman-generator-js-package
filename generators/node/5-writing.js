'use strict';

module.exports = function () {
	// Create main files.
	var mainFilePath = 'src/' + this.pkg.main || 'index.js';
	
	if (!this.fs.exists(mainFilePath)) {
		this.fs.copy(
			__dirname + '/templates/src/index.benchmark.js',
			this.destinationPath(mainFilePath.replace('.js', '.benchmark.js'))
		);
	}
	
	if (!this.fs.exists(mainFilePath)) {
		this.fs.copy(
			__dirname + '/templates/src/index.spec.js',
			this.destinationPath(mainFilePath.replace('.js', '.spec.js'))
		);
	}
};
