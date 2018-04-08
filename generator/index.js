const generator = require('./generator');
const idlFinder = require('./idl_finder');
const parser = require('./parser');

async function main() {
  const idlList = await idlFinder.findAll();
  const ast = await parser.parse(idlList);
  const generatedFileList = await generator.generate(ast);

  for (let filePath of generatedFileList) {
    process.stdout.write(`${filePath}\n`);
  }
}

module.exports = {
  main: main
};
