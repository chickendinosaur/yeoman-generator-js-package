'use strict';

const Generator = require('yeoman-generator');

module.exports = class extends Generator {
	constructor(args, opts) {
		super(args, opts);
	}
	initializing() { require('./1-initializing').call(this); }
	prompting() {
		return require('./2-prompting').call(this);
	}
	configuring() { require('./3-configuring').call(this); }
	default () { require('./4-default').call(this); }
	writing() { require('./5-writing').call(this); }
	conflicts() { require('./6-conflicts').call(this); }
	install() { require('./7-install').call(this); }
	end() { require('./8-end').call(this); }
};
