'use strict';
const buildType = process.config.target_defaults.default_configuration;
const assert = require('assert');

test(require(`./build/${buildType}/binding.node`));
test(require(`./build/${buildType}/binding_noexcept.node`));

function test(binding) {
  let called = false;
  binding.asynccontext.createAsyncContext(function() {
    called = true;
  });
  assert.strictEqual(called, false);
  binding.asynccontext.makeCallback();
  assert.strictEqual(called, true);
}
