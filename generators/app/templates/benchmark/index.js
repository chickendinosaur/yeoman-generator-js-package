require('lodash');
Benchmark = require('benchmark');
const suite = new Benchmark.Suite;

const index = require('../lib/index');

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
console.log('benchmark/index.js');
console.log('');

suite
	.add('index', function () {
		typeof index === 'object';
	})
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
