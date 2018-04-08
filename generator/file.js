const fs = require('fs');

async function read(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
}

async function write(path, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', (error) => {
      if (error) {
        reject(error);
      }
      resolve();
    });
  });
}

module.exports = {
  read: read,
  write: write
};
