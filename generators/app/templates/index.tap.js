'use strict';

const t = require('tap');

// Run the supplied function when t.end() is called, or when the plan is met.
t.teardown(function() {});

// Call the supplied function before every subsequent descendent test.
t.beforeEach(function (done) {});

// Call the supplied function after every subsequent descendent test.
t.afterEach(function (done) {});

t.test('', function (assert) {
	t.equal(1, 1);

	t.end();
});
