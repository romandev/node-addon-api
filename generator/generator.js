const template = require('./template');

async function generateInitializer(ast) {
  const interfaceNameList = [];

  for (let syntax of ast) {
    if (syntax.type === 'interface') {
      interfaceNameList.push(syntax.name);
    }
  }

  await template.render({
    input: `${__dirname}/templates/nidl_cpp.tmpl`,
    output: `${__dirname}/../examples/build/nidl.cc`,
    interfaceNameList: interfaceNameList
  });

  return [
    'build/nidl.cc'
  ];
}

async function generateInterface(ast) {
  const outputFiles = [];

  for (let syntax of ast) {
    if (syntax.type === 'interface') {
      await template.render({
        input: `${__dirname}/templates/interface_cpp.tmpl`,
        output: `${__dirname}/../examples/build/nidl_${syntax.name.toLowerCase()}.cc`,
        data: syntax
      });

      await template.render({
        input: `${__dirname}/templates/interface_header.tmpl`,
        output: `${__dirname}/../examples/build/nidl_${syntax.name.toLowerCase()}.h`,
        data: syntax
      });

      outputFiles.push(`build/nidl_${syntax.name.toLowerCase()}.cc`);
      outputFiles.push(`build/nidl_${syntax.name.toLowerCase()}.h`);
    }
  }

  return outputFiles;
}

async function generate(ast) {
  return [
    ...await generateInitializer(ast),
    ...await generateInterface(ast)
  ];
}

module.exports = {
  generate: generate
}
