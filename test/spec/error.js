'use strict';

var sporks = require('../../scripts');

describe('error', function () {

  it('should throw if error not', function () {
    return sporks.shouldThrow(function () {
      return sporks.throwIfErrorNot(new Error(), 'AnotherError');
    });
  });

  it('should not throw if error is', function () {
    return sporks.throwIfErrorNot(new Error(), 'Error');
  });

  it('should ignore error', function () {
    return sporks.ignoreError(function () {
      return sporks.promiseError(new Error());
    });
  });

});
