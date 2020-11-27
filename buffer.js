const Buffer = require('buffer').Buffer;

let result;

// result = Buffer.allocUnsafe(10, 'abcd');

// console.log(result);
// console.log('utf8', result.toString('utf8'))
// console.log('base64', result.toString('base64'))
// console.log('base64', Buffer.byteLength(result))

result = Buffer.alloc(10, 'abcd');

console.log(result);
console.log('utf8', result.toString('utf8'))
console.log('base64', result.toString('base64'))
console.log('byteLength', Buffer.byteLength(result))
console.log('compare', Buffer.compare(result, Buffer.alloc(10, 'abcd')))
console.log('concat', Buffer.concat([result, Buffer.alloc(10, 'fghi')], 14))

const slice = result.slice(0, 4);
const subarray = result.subarray(0, 4);
const from = Buffer.from(result, 4)
const copy = Buffer.allocUnsafe(4);
result.copy(copy, 0, 0, 4)

console.log('slice', slice, result)
console.log('from', from)
console.log('subarray', subarray)
console.log('copy', copy)

console.log('------ First byte is modified -----')
result[0] = 'X'

// Slice & subarray creates a view pojnting the same reference
console.log('slice', slice, result)
console.log('subarray', subarray)
// From & copy creates a new Buffer
console.log('from', from)
console.log('copy', copy)
