'use strict';

var sporks = require('../../scripts');

describe('function', function () {

  it('should convert to args array', function () {
    function list() {
      return sporks.toArgsArray(arguments);
    }

    list(1, 2, 3).should.eql([1, 2, 3]);
  });

});
