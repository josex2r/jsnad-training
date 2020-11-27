const mocha = require('mocha');
const assert = require('assert').strict;
const chai = require('chai');

describe('foo', () => {
	beforeEach(async () => {
		await new Promise((res) => setTimeout(res, 1000))
	})
	// it('works', () => {
	// 	assert.throws(() => {
	// 		throw new Error('foo');
	// 	}, {
	// 		name: /TypeError/
	// 	}, 'wassup');
	// 	// assert(false, 'foo');
	// 	assert.equal('foo', 'bar');
	// 	chai.assert.equal('foo', 'bar');
	// });
})
