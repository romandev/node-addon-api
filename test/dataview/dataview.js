'use strict';

const buildType = process.config.target_defaults.default_configuration;
const assert = require('assert');

test(require(`../build/${buildType}/binding.node`));
test(require(`../build/${buildType}/binding_noexcept.node`));

function test(binding) {
  function testDataViewCreation(factory, arrayBuffer, offset, length) {
    const view = factory(arrayBuffer, offset, length);
    assert.ok(dataview.getArrayBuffer(view) instanceof ArrayBuffer);
    assert.strictEqual(dataview.getArrayBuffer(view), arrayBuffer);
    assert.strictEqual(dataview.getByteOffset(view), offset ? offset : 0);
    assert.strictEqual(dataview.getByteLength(view), length ? length : 0);
  }

  const dataview = binding.dataview;
  const arrayBuffer = new ArrayBuffer(10);

  testDataViewCreation(dataview.createDataView1, arrayBuffer);
  testDataViewCreation(dataview.createDataView2, arrayBuffer, 2);
  testDataViewCreation(dataview.createDataView3, arrayBuffer, 2, 4);
}
