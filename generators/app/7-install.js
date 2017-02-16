'use strict';

const arrUnion = require('array-union');

module.exports = function () {
	// Do not install new dependency versions over old ones.
	this.peerDependencies arrUnion(this.pkg.devDependencies, this.devDependencies);

	if (Array.isArray(this.devDependencies) &&
		this.devDependencies.length > 0) {
		this.npmInstall(this.devDependencies, {
			'save-dev': true
		});
	}

	this.peerDependencies = arrUnion(this.pkg.dependencies, this.dependencies);

	if (Array.isArray(this.dependencies) &&
		this.dependencies.length > 0) {
		this.npmInstall(this.dependencies, {
			'save': true
		});
	}

	this.peerDependencies = arrUnion(this.pkg.peerDependencies, this.peerDependencies);

	if (Array.isArray(this.peerDependencies) &&
		this.peerDependencies.length > 0) {
		this.npmInstall(this.peerDependencies, {
			'save-peer': true
		});
	}
};
