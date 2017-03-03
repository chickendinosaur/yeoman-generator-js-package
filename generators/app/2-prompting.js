'use strict';

module.exports = function () {
	return this.prompt([
		{
			type: 'list',
			name: 'item',
			message: 'Create:',
			choices: [
				'package', 'package-browser'
			],
			default: 'package'
		}
	]).then((answers) => {
		if (answers.item === 'package') {
			this.composeWith(require.resolve('../package'), this.options);
		} else if (answers.item === 'package-browser') {
			this.composeWith(require.resolve('../package-browser'), this.options);
		}
	});
};
