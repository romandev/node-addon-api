var fs = require('fs');
var path = require('path');

async function getNidlFiles(dir, files) {
  files = files || [];
  var list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.resolve(dir, file);
    if (fs.statSync(file).isDirectory() && !files === 'node_modules'){
      getNidlFiles(file, files);
    } else if( file.includes('.nidl')) {
      files.push(file);
    }
  });
  return files;
}

async function findAll() {
  var packageDir = process.cwd();
  var nidlList = await getNidlFiles(packageDir);
  return nidlList;
}

module.exports = {
  findAll: findAll
};
