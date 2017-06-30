'use strict';

var Promise = require('./promise');

var Sporks = function () {};

Sporks.prototype.errorInstanceOf = function (err, name) {
  // NOTE: we analyze the error name instead of using instanceof as our errors may be located in
  // different repos and therefore, we may have different versions of these errors, which will
  // lead to instanceof tests failing.
  //
  return err.name === name;
};

// This function allows us to have complete code coverage without having to write a test for each
// error branch
Sporks.prototype.throwIfErrorNot = function (err, errName) {
  return new Promise(function (resolve, reject) {
    if (err.name === errName) {
      resolve();
    } else {
      reject(err);
    }
  });
};

// This function provides an easy way to ignore errors without the need to test the error branch.
// This function should be used sparingly as its use can make it hard to track down errors.
Sporks.prototype.ignoreError = function (promise) {
  return promise().catch(function () {
    // Do nothing as we are ignoring the error
  });
};

module.exports = new Sporks();
