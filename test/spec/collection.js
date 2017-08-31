'use strict';

var sporks = require('../../scripts');

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

  it('should get length', function () {
    sporks.length({}).should.eql(0);
    sporks.length({
      a: 1,
      b: 2
    }).should.eql(2);
  });

  it('should get length', function () {
    sporks.keys({}).should.eql([]);
    sporks.keys({
      a: 1,
      b: 2
    }).should.eql(['a', 'b']);
  });

  it('should flip', function () {
    sporks.flip({}).should.eql({});
    sporks.flip({
      a: '1',
      b: 2
    }).should.eql({
      '1': 'a',
      '2': 'b'
    });
  });

  it('should consider primitives equal', function () {
    var s = 'foo';
    sporks.isEqual(s, s).should.eql(true);
    sporks.isEqual('foo', 'foo').should.eql(true);
    sporks.isEqual('foo', 'noo').should.eql(false);

    var n = 1;
    sporks.isEqual(n, n).should.eql(true);
    sporks.isEqual(0, 1).should.eql(false);

    var b = true;
    sporks.isEqual(b, b).should.eql(true);
    sporks.isEqual(false, true).should.eql(false);
  });

  it('should consider objects equal', function () {
    sporks.isEqual({
      foo: 'bar'
    }, {
      foo: 'bar'
    }).should.eql(true);

    sporks.isEqual({
      foo: 'bar'
    }, {
      foo: 'nar'
    }).should.eql(false);

    sporks.isEqual({
      foo: 'bar',
      nar: 1
    }, {
      nar: 1,
      foo: 'bar'
    }).should.eql(true);

    sporks.isEqual({
      foo: 'bar',
      nar: 1
    }, {
      nar: 1,
      foo: 'nar'
    }).should.eql(false);

    sporks.isEqual({
      foo: 'bar',
      nar: 1
    }, {
      nar: 1,
      foo: 'bar',
      tar: false
    }).should.eql(false);

    sporks.isEqual({
      inner: {
        foo: 'bar',
        nar: 1
      }
    }, {
      inner: {
        nar: 1,
        foo: 'bar'
      }
    }).should.eql(true);

    sporks.isEqual({
      inner: {
        foo: 'bar',
        nar: 1
      }
    }, {
      other: {
        nar: 1,
        foo: 'bar'
      }
    }).should.eql(false);
  });

});
