'use strict';

const tape = require('tape');
const tapes = require('tapes');
const test = tapes(tape, {
	delimiter: '->'
});

/*
Setup
*/

/*
Test
*/

test('Class', function (t) {
	t.beforeEach(function (t) {
		t.end();
	});

	t.afterEach(function (t) {
		t.end();
	});

	t.test('.method', function (t) {
		t.equal(true, true, 'Test.');
		t.end();
	});

	t.end();
});
