const child = require('child_process');
const through = require('through2');
const stream = require('stream');

const { exec, spawn, fork } = child;

/*
 * EXEC
 */

// result = exec('ls -la', (err, data) => {
//     err && console.error(err);
//     !err && console.log(data);
// });

// console.log('PID', result.pid);
// console.log('------------')


/*
 * SPAWN
 */

// result = spawn('ls', ['-la']);

// console.log('PID', result.pid);
// console.log('------------')

// // result.stdout.pipe(process.stdout)
// // previous is the same as
// stream.pipeline(
//     result.stdout,
//     process.stdout,
//     (err) => {
// 	console.log(err)
//     }
// );

// result.on('error', () => {})

/*
 * FORK
 */

module.exports = 'foo';
