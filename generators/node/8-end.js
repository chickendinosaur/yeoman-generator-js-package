'use strict';

module.exports = function () {
	this.composeWith(require.resolve('../app'), this.options);
};
