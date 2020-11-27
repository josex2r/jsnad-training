const interval = setInterval(() => {
    process.stdout.write('.');
}, 100);

process.stdin.on('data', (data) => {
    console.log('I\'m foo.js:', data.toString('utf8'));
    process.exit(0);
});