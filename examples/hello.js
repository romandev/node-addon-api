const buildType = process.config.target_defaults.default_configuration;
const addon = require(`./build/${buildType}/hello.node`);

console.log(addon.hello()); // 'world'
