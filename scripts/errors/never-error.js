'use strict';

var NeverError = function (message) {
  this.name = 'NeverError';
  this.message = message;
};

NeverError.prototype = Object.create(Error.prototype);
NeverError.prototype.constructor = NeverError;

module.exports = NeverError;
