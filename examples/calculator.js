const buildType = process.config.target_defaults.default_configuration;
const nidl = require(`./build/${buildType}/calculator.node`);

const calculator = new nidl.Calculator();
console.log(calculator.add(10, 20)); // 30
console.log(calculator.sub(10, 20)); // -10
