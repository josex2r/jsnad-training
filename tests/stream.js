const assert = require('chai').assert;
const sinon = require('sinon');
const { PassThrough, Readable, Writable, pipeline } = require('stream');
const { doesNotMatch } = require('assert');
const { log, toJSON, byLine, byColumn } = require('../csv-to-json');

let sandbox;

const getMockReadable = () => new Readable.from([])
const getMockWritable = () => new Writable({
    objectMode: true,
    write(chunk, enc, callback) {
        this.data = this.data || [];
        this.data.push(chunk);
        callback();
    }
})

describe('streams', () => {
    beforeEach(() => {
        sandbox = sinon.createSandbox();
    })

    afterEach(() => {
        sandbox.restore();
    })

    it('logs output', (done) => {
        const mockReadable = getMockReadable()

        sandbox.stub(console, 'log');
        
        pipeline(
            mockReadable,
            log(),
            () => {
                assert.equal(console.log.getCall(0).args[0], 'foo')
                done();
            }
        );

        mockReadable.emit('data', 'foo');
    });

    it('splits by line', (done) => {
        const mockReadable = getMockReadable()
        const mockWritable = getMockWritable()

        pipeline(
            mockReadable,
            byLine(),
            mockWritable,
            (err) => {
                assert.deepEqual(mockWritable.data.map(a => a.toString()), ['foo', 'bar'])
                done();
            }
        );   

        mockReadable.emit('data', 'foo\nbar');
    });

    it('splits by column', (done) => {
        const mockReadable = getMockReadable()
        const mockWritable = getMockWritable()

        pipeline(
            mockReadable,
            byColumn(),
            mockWritable,
            (err) => {
                assert.deepEqual(mockWritable.data, [['foo', 'bar'], ['bar', 'wow']])
                done();
            }
        );   

        mockReadable.emit('data', 'foo:bar');
        mockReadable.emit('data', 'bar:wow');
    });

    it('transforms to json', (done) => {
        const mockReadable = getMockReadable()
        const mockWritable = getMockWritable()

        pipeline(
            mockReadable,
            toJSON(),
            mockWritable,
            (err) => {
                assert.deepEqual(mockWritable.data[0], [{ foo: 'bar', bar: 'wow' }, { foo: 'foz', bar: 'baz' }])
                done();
            }
        );   

        mockReadable.emit('data', ['foo', 'bar']);
        mockReadable.emit('data', ['bar', 'wow']);
        mockReadable.emit('data', ['foz', 'baz']);
    });
});