const constants = require('./constants');
const file = require('./file');
const template = require('./template');

async function main() {
  await file.write(`${constants.NIDL_FILE_PATH}/nidl.cc`,
      await template.render(constants.NIDL_CPP_TMPL,
          { nameList: ['nidl_hello'] }));
  console.log(`${constants.NIDL_FILE_PATH}/nidl.cc`);
}

module.exports = {
  main: main
};
