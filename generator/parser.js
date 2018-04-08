const file = require('./file');
const webidl = require('./webidl');

async function parse(idlList) {
  return webidl.parse(await file.read(idlList[0]));
}

module.exports = {
  parse: parse
};
