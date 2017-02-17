'use strict';

module.exports = function () {
	this.composeWith(require.resolve('../node'), this.options);
};
