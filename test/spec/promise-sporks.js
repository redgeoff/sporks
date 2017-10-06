'use strict';

var sporks = require('../../scripts'),
  events = require('events'),
  Promise = require('../../scripts/promise');

describe('promise', function () {

  it('should timeout', function () {
    var t1 = (new Date()).getTime(),
      ms = 10;
    return sporks.timeout(ms).then(function () {
      var t2 = (new Date()).getTime();
      (t2 - t1 >= ms).should.eql(true);
    });
  });

  it('should resolve factory', function () {
    var promise = sporks.resolveFactory();
    return promise().then(function () {
      // empty case
    });
  });

  it('should promise error', function () {
    var err = new Error('my error');
    return sporks.shouldThrow(sporks.promiseErrorFactory(err), err);
  });

  it('should do and then emit once', function () {
    var emitter = new events.EventEmitter(),
      args = {
        foo: 'bar'
      };

    var promise = function () {
      return Promise.resolve().then(function () {
        emitter.emit('my-event', args);
      });
    };

    return sporks.doAndOnce(promise, emitter, 'my-event').then(function (_args) {
      _args[0].should.eql(args);
    });
  });

  it('should once', function () {
    var emitter = new events.EventEmitter(),
      args = {
        foo: 'bar2'
      };

    setTimeout(function () {
      emitter.emit('my-event', args);
    }, 1);

    return sporks.once(emitter, 'my-event').then(function (_args) {
      _args[0].should.eql(args);
    });
  });

  it('should promisify', function () {
    var Foo = function () {
      this.x = 7;

      this.bar = function (y, callback) {
        if (y === this.x) {
          callback(null, y);
        } else {
          callback(new Error('not equal'));
        }
      };
    };

    var foo = new Foo();

    var bar = sporks.promisify(foo.bar, foo);

    return bar(7).then(function (y) {
      // y.should.eql(7); // doesn't work in IE 9
      (y === 7).should.eql(true);
    }).then(function () {
      return sporks.shouldThrow(function () {
        return bar(6);
      }, new Error('not equal'));
    });
  });

  it('should promisify when callback has multiple parameters', function () {
    var Foo = function () {
      this.x = 7;

      this.bar = function (y, callback) {
        if (y === this.x) {
          callback(null, y, y + 1);
        } else {
          callback(new Error('not equal'));
        }
      };
    };

    var foo = new Foo();

    var bar = sporks.promisify(foo.bar, foo);

    return bar(7).then(function (args) {
      // Doesn't work in IE 9:
      // args[0].should.eql(7);
      // args[1].should.eql(8);

      (args[0] === 7).should.eql(true);
      (args[1] === 8).should.eql(true);
    }).then(function () {
      return sporks.shouldThrow(function () {
        return bar(6);
      }, new Error('not equal'));
    });
  });

  it('should wait for', function () {
    var i = 0,
      n = 3;

    var waitForThis = function () {
      return ++i >= n ? true : undefined;
    };

    return sporks.waitFor(waitForThis).then(function () {
      i.should.eql(n);
    });
  });

  it('wait for should throw if takes too long', function () {
    var maxSleep = 500,
      sleepMs = 100;
    return sporks.shouldThrow(function () {
      return sporks.waitFor(function () {
        // This will never be ready
        return undefined;
      }, maxSleep, sleepMs);
    });
  });

});
