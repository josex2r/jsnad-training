const fs = require('fs');
const path = require('path');
const util = require('util');

const readdir = util.promisify(fs.readdir);
const lstat = util.promisify(fs.lstat);
const realpath = util.promisify(fs.realpath);
const access = util.promisify(fs.access);

async function printDir(dir, level = 0) {
  const files = await readdir(dir);

  console.log(' '.padStart((level - 1) * 2), `${path.basename(dir)}/`);

  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = await lstat(filepath);

    if (!stat.isDirectory()) {
	    console.log(filepath)
      // const canRead = await access(filepath, fs.constants.R_OK);
      // const canWrite = await access(filepath, fs.constants.W_OK);
      // const canDoAll = await access(filepath, fs.constants.W_OK | fs.constants.W_OK);

      if (stat.isSymbolicLink()) {
        const realFilepath = await realpath(filepath);

        console.log(' '.padStart(level * 2), file, '=>', realFilepath);
      } else {
        console.log(' '.padStart(level * 2), file, stat.mode);
      }
    } else {
      // await printDir(filepath, level + 1);
    }
  }
}

(async function() {
  await printDir(process.argv[2]);
})();

// fs.symlink('index.js', 'index-linked.js', console.log)

// fs.mkdir('a/b/c/d', { recursive: true }, console.log)

// fs.watchFile('fs.js', (curr, prev) => {
//   console.log('curr', curr);
//   console.log('prev', prev);
// });
