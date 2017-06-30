'use strict';

var sporks = require('../../scripts');

describe('object', function () {

  it('should identify undefined', function () {
    var foo = function (myVar) {
      sporks.notDefined(myVar).should.eql(true);
    };
    foo();
  });

  it('should identify defined', function () {
    var myVar = null;
    sporks.isDefined(myVar).should.eql(true);
  });

});
