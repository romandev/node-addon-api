const buildType = process.config.target_defaults.default_configuration;
const nidl = require(`./build/${buildType}/hello.node`);

const hello = new nidl.Hello();
console.log(hello.world()); // 'hello, world!'
