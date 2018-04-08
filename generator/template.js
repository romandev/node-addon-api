const file = require('./file');

function snakeCase(camelCase) {
  return camelCase.replace(/([|A-Z])/g, '_$1').toLowerCase();
}

async function render(data) {
  const template = await file.read(data.input);
  const expansion = template.replace(/[\r\t]/g, ' ')
      .replace(/[\n]/g, '<NEW_LINE>')
      .split('<%').join('\t')
      .replace(/((^|%>)[^\t]*)'/g, '$1\r')
      .replace(/\t=(.*?)%>/g, '\',$1,\'')
      .split('\t').join('\');')
      .split('%>').join('tokens.push(\'')

  const result = (new Function('data', `
    const tokens = [];
    const filter = {
      snakeCase: ${snakeCase}
    };
    with (data) {
      tokens.push('${expansion}');
    }
    return tokens.join('');
  `))(data).replace(/<NEW_LINE>/g, '\n');

  return file.write(data.output, result);
}

module.exports = {
  render: render
};
