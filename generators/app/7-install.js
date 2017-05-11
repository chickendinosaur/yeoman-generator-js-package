'use strict';

module.exports = function () {
	// Do not install new dependency versions over old ones.
	this.devDependencies = filterDupeKeys(this.pkg.devDependencies, this.devDependencies);
	if (Array.isArray(this.devDependencies) && this.devDependencies.length > 0) {
		this.npmInstall(this.devDependencies, {'save-dev': true});
	}

	this.dependencies = filterDupeKeys(this.pkg.dependencies, this.dependencies);

	if (Array.isArray(this.dependencies) && this.dependencies.length > 0) {
		this.npmInstall(this.dependencies, {'save': true});
	}

	this.peerDependencies = filterDupeKeys(this.pkg.peerDependencies, this.peerDependencies);

	if (Array.isArray(this.peerDependencies) && this.peerDependencies.length > 0) {
		this.npmInstall(this.peerDependencies, {'save-peer': true});
	}
};

function filterDupeKeys(obj, keys) {
	var result = [];
	for (var i = 0; i < keys.length; i++) {
		if (obj[keys[i]] === undefined) {
			result.push(keys[i]);
		}
	}
	return result;
}
