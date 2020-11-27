process.on('exit', () => {
    console.log(process.resourceUsage());
});

setTimeout(() => {
    console.log('setTimeout');
}, 1000);

console.log('start');

setTimeout(() => {
  console.log('setTimeout callback');
}, 0);

process.nextTick(() => {
  console.log('nextTick A callback');
});

process.nextTick(() => {
  console.log('nextTick B callback');

  process.nextTick(() => {
    console.log('nextTick C callback');
  });
});

console.log(`process.getegid(): ${process.getegid()}`); // Method returns the numerical effective group identity of the Node.js process.
console.log(`process.geteuid(): ${process.geteuid()}`); // Method returns the numerical effective user identity of the process.
console.log(`process.getgid(): ${process.getgid()}`); // Method returns the numerical group identity of the process.
console.log(`process.getgroups(): ${process.getgroups()}`); // Method returns an array with the supplementary group IDs.
console.log(`process.getuid(): ${process.getuid()}`); // Method returns the numeric user identity of the process.