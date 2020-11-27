const EventEmitter = require('events');

const pong = new EventEmitter();
const ping = new EventEmitter();

// pong.setMaxListeners(1);

pong.on('ping', (e) => console.log('ping'));
pong.on('ping', () => setTimeout(() => ping.emit('pong'), 1000));
ping.on('pong', () => console.log('pong'));
ping.on('pong', () => setTimeout(() => pong.emit('ping'), 1000));

pong.emit('ping');

console.log('ping events: ', ping.eventNames());
console.log('ping listeners: ', ping.rawListeners('pong'));
console.log('pong events: ', pong.eventNames());
console.log('pong listeners: ', pong.rawListeners('ping'));
