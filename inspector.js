const inspector = require('inspector');
const fs = require('fs');

const session = new inspector.Session();

inspector.open('localhost', 9229, true);
session.connect();

session.on('HeapProfiler.addHeapSnapshotChunk', (m) => {
    console.log('HeapProfiler.addHeapSnapshotChunk')
    fs.appendFileSync('profile.cpuprofile', m.params.chunk + '\n');
});

session.post('HeapProfiler.takeHeapSnapshot', null, (err, r) => {
    console.log('HeapProfiler.takeHeapSnapshot done:', err, r);
    
    session.post('HeapProfiler.takeHeapSnapshot', null, (err, r) => {
        console.log('HeapProfiler.takeHeapSnapshot done:', err, r);
        // session.disconnect();
    });
});

session.post('Profiler.enable', () => {
    session.post('Profiler.start', () => {
        inspector.console.log('start profiling!');
    });
});

setTimeout(() => {
    session.post('Profiler.stop', (err, { profile }) => {
        if (!err) {
            inspector.console.log('end profiling!');
        }
    });
}, 1000);