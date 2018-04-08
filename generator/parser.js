const file = require('./file');
const webidl = require('./webidl');

async function parse(idlList) {
  // TODO(zino): Should implement this function.
  return webidl.parse(await file.read(idlList[0]));
}

module.exports = {
  parse: parse
};
