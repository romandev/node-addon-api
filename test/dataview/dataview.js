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
    assert.strictEqual(dataview.getByteLength(view), length ? length : arrayBuffer.byteLength);
  }

  function testGetSetMethods(dataviewBinding) {
    const view = dataviewBinding.createDataView1(arrayBuffer);
    dataviewBinding.setFloat32(view, 0, 10.2);
    dataviewBinding.setFloat64(view, 4, 20.2);
    dataviewBinding.setInt8(view, 12, 250);
    dataviewBinding.setInt16(view, 13, 10271);
    dataviewBinding.setInt32(view, 17, 20123223452);
    dataviewBinding.setUint8(view, 12, 250);
    dataviewBinding.setUint16(view, 13, 10271);
    dataviewBinding.setUint32(view, 17, 20123223452);

    view.setFloat32(view, 1, 10.2);
    view.setFloat32(view, 1, 10.2);
    view.setFloat32(view, 1, 10.2);
    view.setFloat32(view, 1, 10.2);
    view.setFloat32(view, 1, 10.2);
    view.setFloat32(view, 1, 10.2);
    view.setFloat32(view, 1, 10.2);
  }

  const dataview = binding.dataview;
  const arrayBuffer = new ArrayBuffer(100);

  testDataViewCreation(dataview.createDataView1, arrayBuffer);
  testDataViewCreation(dataview.createDataView2, arrayBuffer, 2);
  testDataViewCreation(dataview.createDataView3, arrayBuffer, 2, 4);

  const view = dataview.createDataView1(arrayBuffer);
  dataview.setFloat32(view, 1, 10.2);
  console.log(dataview.getFloat32(view, 1));
  console.log(view.getFloat32(1, true));
}
