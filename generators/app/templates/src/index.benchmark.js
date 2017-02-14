require('lodash');
const Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

/*
Setup.
*/

/*
Teardown.
*/

function teardown() {}

console.log('');
console.log('Benchmark');
console.log('');
console.log('index.benchmark.js');
console.log('');

suite
	.add('index', function () {})
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
