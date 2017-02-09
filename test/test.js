import * as test from '../src/index.js';
import test2 from '../src/test.js';
var assert = require('assert');
describe('index.js: ', function () {
  it('isNum() should work fine.', function () {

    assert.equal(test.isNum(1), true);
    assert.equal(test.isNum('1'), false);
  });


});

describe('test.js: ', function () {
  it('test', function () {
    assert.equal(test2(), 'test')
  });
});
