'use strict';

var Sporks = function () {};

Sporks.prototype.notDefined = function (val) {
  return typeof val === 'undefined';
};

Sporks.prototype.isDefined = function (val) {
  return typeof val !== 'undefined';
};

module.exports = new Sporks();
