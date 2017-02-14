'use strict';

const tap = require('tap');
const test = tap.test;
const beforeEach = tap.beforeEach;

/*
Setup
*/

beforeEach(function (done) {
});

/*
Test
*/

test('suite', {
	todo: true
}, function (t) {
	t.equal(true, null, 'test.');
	t.end();
});
