console.log('log');
console.info('info');
console.warn('warn');
console.error('error');

console.assert(true, 'assert true');
console.assert(false, 'assert false');

console.count('count');
console.count('count');
console.countReset('count');
console.count('count');

console.dir({a:{b:{c:{d:{}}}}}, { depth: 9 });

console.group('group');
console.log('log');
console.info('info');
console.warn('warn');
console.error('error');
console.groupEnd('group');

console.table({a:[1,2,3], b: [4,5,6], c: [7,8,9]});

console.time('time');
console.timeEnd('time');
