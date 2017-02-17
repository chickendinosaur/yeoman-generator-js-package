'use strict';

module.exports = function () {
	// Create main files.
	var mainFilePath = 'src/' + this.pkg.main || 'index.js';
	this.fs.copy(
		__dirname + '/templates/' + mainFilePath.replace('.js', '.benchmark.js'),
		this.destinationPath(mainFilePath.replace('.js', '.benchmark.js'))
	);
	this.fs.copy(
		__dirname + '/templates/' + mainFilePath.replace('.js', '.spec.js'),
		this.destinationPath(mainFilePath.replace('.js', '.spec.js'))
	);
};
