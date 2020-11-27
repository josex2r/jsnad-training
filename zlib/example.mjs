/**
 * Description: Create severals .gz file with gzip, deflate and brotli methods. You can see which one is more efficient.
 */

/** Import generics dependences */
import zlib from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define source and destination file for uncompress secuence.
const sourceJPG = createReadStream(`${__dirname}/photo.jpg`);
const destinationGzipJPG = createWriteStream(`${__dirname}/photo-gzip.jpg.gz`);
const destinationDeflateJPG = createWriteStream(`${__dirname}/photo-deflate.jpg.gz`);
const destinationBrotliJPG = createWriteStream(`${__dirname}/photo-brotli.jpg.gz`);
// Define source and destination file for uncompress secuence.
const sourceTXT = createReadStream(`${__dirname}/article.txt`);
const destinationGzipTXT = createWriteStream(`${__dirname}/article-gzip.txt.gz`);
const destinationDeflateTXT = createWriteStream(`${__dirname}/article-deflate.txt.gz`);
const destinationBrotliTXT = createWriteStream(`${__dirname}/article-brotli.txt.gz`);
const destinationUnzipTXT = createWriteStream(`${__dirname}/article-gzip.unzip.txt`);

// Define pipeline with streams and gzip method (other stream).
pipeline(sourceJPG, zlib.createGzip(), destinationGzipJPG, (err) => {
  if (err) {
    console.error('[gzip jpg] Ups, an error:', err);
    process.exitCode = 1;
  }
  console.log('[gzip jpg] Done!');
});

// Define pipeline with streams and gzip method (other stream).
pipeline(sourceJPG, zlib.createDeflate(), destinationDeflateJPG, (err) => {
  if (err) {
    console.error('[deflate jpg] Ups, an error:', err);
    process.exitCode = 1;
  }
  console.log('[deflate jpg] Done!');
});

// Define pipeline with streams and gzip method (other stream).
pipeline(sourceJPG, zlib.createBrotliCompress(), destinationBrotliJPG, (err) => {
  if (err) {
    console.error('[brotli jpg] Ups, an error:', err);
    process.exitCode = 1;
  }
  console.log('[brotli jpg] Done!');
});

// Define pipeline with streams and gzip method (other stream).
pipeline(sourceTXT, zlib.createGzip(), destinationGzipTXT, (err) => {
  if (err) {
    console.error('[gzip txt] Ups, an error:', err);
    process.exitCode = 1;
  }
  console.log('[gzip txt] Done!');

  // Define pipeline with streams and gzip method (other stream).
  pipeline(createReadStream(`${__dirname}/article-gzip.txt.gz`), zlib.createUnzip(), destinationUnzipTXT, (err) => {
    if (err) {
      console.error('[gzip txt] Ups, an error:', err);
      process.exitCode = 1;
    }
    console.log('[gunzip txt] Done!');
  });
});

// Define pipeline with streams and gzip method (other stream).
pipeline(sourceTXT, zlib.createDeflate(), destinationDeflateTXT, (err) => {
  if (err) {
    console.error('[deflate txt] Ups, an error:', err);
    process.exitCode = 1;
  }
  console.log('[deflate txt] Done!');
});

// Define pipeline with streams and gzip method (other stream).
pipeline(sourceTXT, zlib.createBrotliCompress(), destinationBrotliTXT, (err) => {
  if (err) {
    console.error('[brotli txt] Ups, an error:', err);
    process.exitCode = 1;
  }
  console.log('[brotli txt] Done!');
});
