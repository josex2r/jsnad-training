const { execFile } = require('child_process');

const sub = execFile('node', ['foo.js'], {
    cwd: __dirname
}, (err, data) => {
    if (err) {
        throw err;
    }
    
    console.log('-- Total data writen in sub-task:', Buffer.byteLength(data));
});

sub.stdout.on('data', (data) => {
    debugger
    console.log('Data from foo.js:', data.toString('utf8'));
});

sub.on('exit', (data) => {
    console.log('Exit foo.js');
});

setTimeout(() => {
    sub.stdin.write('[Test]');
}, 2000);

// process.on('uncaughtException', () => console.log('!!!!!!!!!!!!!!!!'));