'use strict';

var sporks = require('../../scripts');

describe('function', function () {

  it('should convert to args array', function () {
    function list() {
      return sporks.toArgsArray(arguments);
    }

    list(1, 2, 3).should.eql([1, 2, 3]);
  });

  it('should copy specific functions', function () {
    var a = {
      foo: function () {},
      bar: function () {}
    };

    var b = {};

    sporks.mix(a, b, ['foo']);

    (b.foo === undefined).should.eql(false);
    (b.bar === undefined).should.eql(true);
  });

});
