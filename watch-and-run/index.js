const path = require('path');
const fs = require('fs');
const { access } = require('fs').promises;
const { execFile } = require('child_process');
const debounce = require('debounce');

function run() {
    const subproc = execFile('node', ['foo.js'], {
        cwd: __dirname
    });
    
    subproc.stdout.on('data', (data) => {
        console.log('Data from foo.js:', data.toString('utf8'));
    });

    subproc.on('exit', (data) => {
        console.log('foo.js exited!');
    });

    return subproc;
}

async function checkFile(event) {
    if (event === 'rename') {
        try {
            await access(path.join(__dirname, 'foo.js'), fs.constants.R_OK);
            return 'create';
        } catch(e) {
            return 'delete';
        }
    }

    return event;
}

async function logFile(event, filename) {
    sub.kill();
    event = await checkFile(event);
    console.log(`"${event}"! restarting the process`);
    sub = run();
}

let sub = run();

fs.watch(path.join(__dirname, 'foo.js'), debounce(logFile, 200));