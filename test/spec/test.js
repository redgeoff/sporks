'use strict';

var sporks = require('../../scripts'),
  Promise = require('../../scripts/promise'),
  NeverError = require('../../scripts/errors/never-error'),
  events = require('events');

describe('test', function () {

  it('should throw should throw never', function () {
    return sporks.ignoreError(function () {
      return sporks.shouldThrow(function () {
        return Promise.resolve();
      }, new Error('err msg')).then(function () {
        return sporks.promiseError(new NeverError());
      });
    });
  });

  it('should throw should handle non-never error with blank message', function () {
    return sporks.shouldThrow(function () {
      return sporks.promiseError(new Error());
    }, new Error());
  });

  it('should non promise throw', function () {
    return sporks.shouldNonPromiseThrow(function () {
      throw new Error();
    });
  });

  it('should non promise throw if no error', function () {
    try {
      sporks.shouldNonPromiseThrow(function () {
        // Do nothing as we are simulating a successful execution
      });
    } catch (err) {
      err.message.should.eql("didn't throw err");
    }
  });

  it('should do and once', function () {
    var emitter = new events.EventEmitter();
    return sporks.shouldDoAndOnce(function () {
      return Promise.resolve().then(function () {
        emitter.emit('foo');
      });
    }, emitter, 'foo');
  });

  it('should do and once and handle error', function () {
    var emitter = new events.EventEmitter();
    return sporks.ignoreError(function () {
      return sporks.shouldDoAndOnce(function () {
        return sporks.promiseError(new Error());
      }, emitter, 'foo');
    });
  });

  it('should do and not once', function () {
    var emitter = new events.EventEmitter();
    return sporks.shouldDoAndNotOnce(function () {
      return Promise.resolve();
    }, emitter, 'foo');
  });

  it('should do and not once and handle error', function () {
    var emitter = new events.EventEmitter();
    return sporks.ignoreError(function () {
      return sporks.shouldDoAndNotOnce(function () {
        return Promise.resolve().then(function () {
          emitter.emit('foo');
        });
      }, emitter, 'foo');
    });
  });

});
