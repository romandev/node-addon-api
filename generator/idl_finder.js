const fs = require('fs');
const path = require('path');

async function readDirectory(directory) {
  return new Promise((resolve, reject) => {
    fs.readdir(directory, (error, files) => {
      if (error) {
        reject(error);
      } else {
        resolve(files.map((file) => path.resolve(directory, file)));
      }
    })
  });
}

async function isDirectory(path) {
  return new Promise((resolve, reject) => {
    fs.lstat(path, (error, stat) => {
      if (error) {
        reject(error);
      } else {
        resolve(stat.isDirectory());
      }
    });
  });
}

// TODO(nadongguri): Should not use recursive.
async function findNidl(directory) {
  const nidlList = [];
  const files = await readDirectory(directory);
  for (const file of files) {
    if (await isDirectory(file) &&
        path.basename(file) !== 'node_modules') {
      nidlList.push(...await findNidl(file)); 
    } else if (path.extname(file) === '.nidl') {
      nidlList.push(file);
    }
  }
  return nidlList;
}

async function findAll() {
  return findNidl(process.cwd());
}

module.exports = {
  findAll: findAll
};
