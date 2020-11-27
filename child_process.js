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

if (!process.send) {
    const sub = fork('child_process.js');
    console.log('I\'m not a fork, ', process.pid);
    
    sub.on('message', (data) => {
        console.log('Message received from subprocess: ', data);
        sub.send('I\'m your father!');
        sub.send({ exit: true });
    });
} else {
    console.log('I\'m a fork, ', process.pid);
    process.on('message', (data) => console.log('Message received from parent: ', data));
    process.on('message', (obj) => obj.exit && process.exit());
    process.send('Hello from a forked script!');
}
