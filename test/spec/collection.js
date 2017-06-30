'use strict';

var sporks = require('../../scripts'),
  inherits = require('inherits');

describe('collection', function () {

  it('should each', function () {
    var A = function () {};
    A.prototype.x = 'foo';

    var a = new A();
    a.y = 'bar';

    var attrs = [];

    sporks.each(a, function (v, n) {
      attrs.push([n, v]);
    });

    attrs.should.eql([
      ['y', 'bar']
    ]);
  });

  it('should clone', function () {
    var a = {
      foo: 'bar'
    };
    var b = sporks.clone(a);
    a.foo = 'yar';
    b.should.eql({
      foo: 'bar'
    });
  });

  it('should detect empty obj', function () {
    sporks.empty({
      foo: 'bar'
    }).should.eql(false);
    sporks.empty({}).should.eql(true);
    sporks.empty(['bar']).should.eql(false);
    sporks.empty([]).should.eql(true);
  });

  it('should merge', function () {
    sporks.merge({
      a: 1,
      b: 2
    }, {
      b: 20,
      c: 3
    }).should.eql({
      a: 1,
      b: 20,
      c: 3
    });
    sporks.merge(null, null).should.eql({});
  });

});
