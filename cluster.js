const child = require('child_process');
const http = require('http');
const cluster = require('cluster');
const os = require('os');

const { exec } = child;

if (cluster.isMaster) {
    os.cpus().forEach(() => {
        cluster.fork();
    });
    
    cluster.on('listening', (worker, address) => {
        console.log(`Worker ${worker.process.pid} Listening with PORT ${address.port}`);
    });
    
    setInterval(() => {
        exec('curl http://localhost:3000', (err, stdout) => {
            console.log(`[${process.pid}] Request ended: `, stdout);
        });
    }, 1000);
} else {
    http.createServer((request, response) => {
        response.writeHead(200);
        response.end(`[${process.pid}] Request received`);
    }).listen(3000);
}
