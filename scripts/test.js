'use strict';

var Promise = require('./promise'),
  NeverError = require('./errors/never-error'),
  errorSporks = require('./error'),
  promiseSporks = require('./promise-sporks');

var Sporks = function () {};

// Time in milliseconds to wait for test to emit the target event. 100 ms appears to be too short on
// Chrome for most of our tests
Sporks.prototype.WAIT_MS = 200;

Sporks.prototype.never = function (msg) {
  throw new NeverError(typeof msg === 'undefined' ? 'must never execute' : msg);
};

Sporks.prototype._errShouldEql = function (expErr, actErr) {
  if (errorSporks.errorInstanceOf(actErr, 'NeverError')) {
    throw new Error("didn't throw err");
  }

  if (expErr) {
    if (expErr.message) {
      expErr.message.should.eql(actErr.message);
    }

    expErr.name.should.eql(actErr.name);
  } else {
    (actErr === null).should.eql(false);
  }
};

// If err.message is falsy then only ensures that both errors are of the same type
Sporks.prototype.shouldThrow = function (fun, err) {
  var self = this;
  return fun().then(function () {
    self.never();
  }).catch(function (_err) {
    self._errShouldEql(err, _err);
  });
};

Sporks.prototype.shouldNonPromiseThrow = function (fun, err) {
  try {
    fun();
    this.never();
  } catch (_err) {
    this._errShouldEql(err, _err);
  }
};

Sporks.prototype.shouldDoAndOnce = function (promiseFactory, emitter, evnt) {
  var self = this,
    err = true;

  return new Promise(function (resolve, reject) {

    promiseSporks.doAndOnce(promiseFactory, emitter, evnt).then(function (args) {
      err = false;

      // We've received the event so resolve now instead of waiting for the timeout
      resolve(args);
    });

    promiseSporks.timeout(self.WAIT_MS).then(function () {
      if (err) {
        reject(new NeverError('should have emitted event ' + evnt));
      }
    });

  });
};

// Execute promise and wait to make sure that event is not emitted
Sporks.prototype.shouldDoAndNotOnce = function (promiseFactory, emitter, evnt) {
  var self = this,
    err = false;

  promiseSporks.doAndOnce(promiseFactory, emitter, evnt).then(function () {
    err = true;
  });

  return promiseSporks.timeout(self.WAIT_MS).then(function () {
    if (err) {
      self.never('should not have emitted event ' + evnt);
    }
  });
};

module.exports = new Sporks();
