'use strict';

const tap = require('tap');
const test = tap.test;
const beforeEach = tap.beforeEach;
const afterEach = tap.afterEach;
const teardown = tap.teardown;

/*
Setup.
*/

// Call the supplied function before every subsequent descendent test.
beforeEach(function (done) {
	done();
});

// Call the supplied function after every subsequent descendent test.
afterEach(function (done) {
	done();
});

// Run the supplied function when t.end() is called, or when the plan is met.
teardown(function() {});

test('', {
	todo: true
}, function (t) {
	t.equal(1, 1, '');
	t.end();
});
