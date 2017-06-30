'use strict';

var Sporks = function () {};

Sporks.prototype.toArgsArray = function (argsObj) {
  return Array.prototype.slice.call(argsObj);
};

Sporks.prototype.mix = function (classA, classB, fns) {
  var copyFunction = function (fn) {
    classB[fn] = classA[fn];
  };

  if (fns) {
    fns.forEach(copyFunction);
  } else {
    for (var i in classA) {
      if (typeof classA[i] === 'function') {
        copyFunction(i);
      }
    }
  }
};

module.exports = new Sporks();
