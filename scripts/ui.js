'use strict';

var Promise = require('./promise');

var Sporks = function () {};

// Traverse the DOM to calculate the absolute position of an element
Sporks.prototype.absolutePosition = function (el) {
  var x = 0,
    y = 0;

  while (el !== null) {
    x += el.offsetLeft;
    y += el.offsetTop;
    el = el.offsetParent;
  }

  return {
    x: x,
    y: y
  };
};

// Source: http://stackoverflow.com/a/7719185/2831606
Sporks.prototype.loadScript = function (src) {
  return new Promise(function (resolve, reject) {
    var s = document.createElement('script');
    s.src = src;
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
  });
};

module.exports = new Sporks();
