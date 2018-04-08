const buildType = process.config.target_defaults.default_configuration;
const nidl = require(`./build/${buildType}/hello.node`);

console.log((new nidl.Hello()).world); // 'world'
