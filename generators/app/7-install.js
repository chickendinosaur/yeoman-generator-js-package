'use strict';

module.exports = function () {
	// Do not install new dependency versions over old ones.
	if (Array.isArray(this.devDependencies) && this.devDependencies.length > 0) {
		this.npmInstall(this.devDependencies, {'save-dev': true});
	}

	if (Array.isArray(this.dependencies) && this.dependencies.length > 0) {
		this.npmInstall(this.dependencies, {'save': true});
	}

	if (Array.isArray(this.peerDependencies) && this.peerDependencies.length > 0) {
		this.npmInstall(this.peerDependencies);
	}
};
