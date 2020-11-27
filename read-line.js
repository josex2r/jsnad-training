const fs = require('fs');
const stream = require('stream');

class MyStream extends stream.Transform {
  constructor() {
    super();
    this.next = '';
  }
  _transform(chunk, enc, callback) {
    const text = this.next + chunk.toString('utf8');
    const slices = text.split('\n');
    
    if (slices.length > 1) {
      this.next = slices.slice(1).join('\n');
      callback(null, slices[0]);
    } else {
      this.next = text;
      callback();
    }
  }
}

class LogStream extends stream.Writable {
  _write(chunk, enc, callback) {
    console.log(chunk.toString('utf8'));
    callback();
  }
}

const myStream = new MyStream();

fs.createReadStream('buffer.js', { highWaterMark: 10 }) // force not reading too much characters
  .pipe(myStream)
  .pipe(new LogStream())

