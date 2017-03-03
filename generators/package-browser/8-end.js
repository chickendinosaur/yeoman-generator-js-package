'use strict';

module.exports = function () {
	this.composeWith(require.resolve('../package'), this.options);
};
