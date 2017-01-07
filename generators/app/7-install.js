'use strict';

module.exports = function () {
	// Do not install new dependency versions over old ones.
	removeDuplicateDeps(this.pkg.devDependencies, this.devDependencies);

	if (Array.isArray(this.devDependencies) &&
		this.devDependencies.length > 0) {
		this.npmInstall(this.devDependencies, {
			'save-dev': true
		});
	}

	removeDuplicateDeps(this.pkg.dependencies, this.dependencies);

	if (Array.isArray(this.dependencies) &&
		this.dependencies.length > 0) {
		this.npmInstall(this.dependencies, {
			'save': true
		});
	}

	removeDuplicateDeps(this.pkg.peerDependencies, this.peerDependencies);

	if (Array.isArray(this.peerDependencies) &&
		this.peerDependencies.length > 0) {
		this.npmInstall(this.peerDependencies, {
			'save-peer': true
		});
	}
};

function removeDuplicateDeps(source, dest) {
	if (source &&
		source.constructor === Object &&
		Array.isArray(dest)) {
		var currentDevDependencies = Object.keys(source);

		for (var i = 0; i < dest.length; ++i) {
			if (currentDevDependencies.indexOf(dest[i]) >= 0) {
				dest.splice(i, 1);
				--i;
			}
		}
	}
}
