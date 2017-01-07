'use strict';

const Generator = require('yeoman-generator').Base;

module.exports = Generator.extend({
	constructor: function (args, opts) {
		Generator.apply(this, arguments);
	},
	initializing: require('./1-initializing'),
	prompting: require('./2-prompting'),
	configuring: require('./3-configuring'),
	default: require('./4-default'),
	writing: require('./5-writing'),
	conflicts: require('./6-conflicts'),
	install: require('./7-install'),
	end: require('./8-end')
});
