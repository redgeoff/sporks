'use strict';

var Promise = require('./promise');

var Sporks = function () {};

Sporks.prototype.timeout = function (sleepMs) {
  return new Promise(function (resolve) {
    setTimeout(resolve, sleepMs);
  });
};

Sporks.prototype.once = function (emitter, evnt) {
  return new Promise(function (resolve) {
    emitter.once(evnt, function () {
      resolve(arguments);
    });
  });
};

Sporks.prototype.resolveFactory = function (data) {
  return function () {
    return Promise.resolve(data);
  };
};

Sporks.prototype.promiseError = function (err) {
  return new Promise(function () {
    throw err;
  });
};

Sporks.prototype.promiseErrorFactory = function (err) {
  var self = this;
  return function () {
    return self.promiseError(err);
  };
};

// Executes promise and then resolves after event emitted once
Sporks.prototype.doAndOnce = function (promise, emitter, evnt) {
  var once = this.once(emitter, evnt);
  return promise().then(function () {
    return once;
  });
};

// Include our own implementation of promisify so that we can move away from bluebird once
// Promises become a standard
Sporks.prototype.promisify = function (fn, thisArg) {
  var self = this;
  return function () {
    var argsArray = self.toArgsArray(arguments);
    return new Promise(function (resolve, reject) {

      // Define a callback and add it to the arguments
      var callback = function (err) {
        if (err) {
          reject(err);
        } else if (arguments.length === 2) { // single param?
          resolve(arguments[1]);
        } else { // multiple params?
          var cbArgsArray = self.toArgsArray(arguments);
          resolve(cbArgsArray.slice(1)); // remove err arg
        }
      };

      argsArray.push(callback);
      fn.apply(thisArg, argsArray);
    });
  };
};

module.exports = new Sporks();
