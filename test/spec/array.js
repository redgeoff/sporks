'use strict';

var sporks = require('../../scripts');

describe('array', function () {

  it('should sort', function () {
    var items = [{
      a: 2
    }, {
      a: null,
      b: -1
    }, {
      a: 5,
      b: null,
      c: '3'
    }, {
      a: 5,
      c: '2'
    }, {
      b: 1,
      c: '2'
    }, {
      b: 1,
      c: '3'
    }];

    var sortedItems = [{
      a: 2
    }, {
      a: 5,
      c: '2'
    }, {
      a: 5,
      b: null,
      c: '3'
    }, {
      b: 1,
      c: '2'
    }, {
      b: 1,
      c: '3'
    }, {
      a: null,
      b: -1
    }];

    sporks.sort(items, ['a', 'c', 'b']).should.eql(sortedItems);
  });

  it('should find intersection', function () {
    var a = ['1', '2', '3'];
    var b = ['2', '3', '4'];
    sporks.intersection(a, b).should.eql(['2', '3']);
  });

});
