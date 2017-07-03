'use strict';

var Sporks = function () {};

Sporks.prototype.toArgsArray = function (argsObj) {
  return Array.prototype.slice.call(argsObj);
};

Sporks.prototype.mix = function (classA, classB, fns) {
  var copyMember = function (member) {
    classB[member] = classA[member];
  };

  if (fns) {
    fns.forEach(copyMember);
  } else {
    for (var i in classA) {
      copyMember(i);
    }
  }
};

module.exports = new Sporks();
