require('lodash');
Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

/*
Setup.
*/

/*
Teardown.
*/

function teardown() {}

suite
	.add('', function () {})
	.on('cycle', function (event) {
		console.log(String(event.target));
		teardown();
	})
	.on('complete', function () {
		console.log('Fastest is ' + this.filter('fastest').map('name'));

		if (typeof window === 'object') {
			window.close();
		}
	})
	// Run async
	.run({ 'async': false });
