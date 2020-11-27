const { fstat } = require('fs');
const stream = require('readable-stream');
const fs = require('fs');
const stringDecoder = require('string_decoder');
const split2 = require('split2');
const csv = require('csv');

const { Transform, Writable } = stream;

const byLine = () => new Transform({
    transform(chunk, enc, callback) {
        this._decoder = this._decoder || new stringDecoder.StringDecoder();
        const lines = this._decoder.write(chunk).split('\n');

        lines.forEach((line) => this.push(line));
        callback();
    }
});

const byColumn = () => new Transform({
    objectMode: true,
    transform(chunk, enc, callback) {
        const columns = chunk.toString().split(':');
  
        callback(null, columns);
    }
});

const toJSON = () => new Transform({
    objectMode: true,
    transform(columns, enc, callback) {
        if (!this.props) {
            this.props = columns;
        } else {
            this.data = this.data || [];
            const obj = columns.reduce((acc, value, index) => {
                acc[this.props[index]] = value;
                return acc;
            }, {});
            this.data.push(obj);
        }
  
        callback();
    },
    flush(callback) {
        callback(null, this.data);
    }
});

const log = () => new Writable({
    objectMode: true,
    write(chunk, enc, callback) {
        console.log(chunk);
        callback();
    }
});

// fs.createReadStream('./csv/example.csv')
//     .pipe(byLine())
//     .pipe(byColumn())
//     .pipe(toJSON())
//     .pipe(log());

// fs.createReadStream('./csv/example.csv')
//     .pipe(split2())
//     .pipe(byColumn())
//     .pipe(toJSON())
//     .pipe(log());

// fs.createReadStream('./csv/example.csv')
//     .pipe(csv.parse({ delimiter: ':' }))
//     .pipe(log());

module.exports = {
    log,
    toJSON,
    byColumn,
    byLine,
}