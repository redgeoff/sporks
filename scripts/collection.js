'use strict';

var Sporks = function () {};

// callback = function (item, key, obj)
// Note: if callback returns false then the loop will stop
Sporks.prototype.each = function (obj, callback) {
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      if (callback(obj[i], i, obj) === false) {
        break;
      }
    }
  }
};

/**
 * Clones data
 */
Sporks.prototype.clone = function (obj) {
  return JSON.parse(JSON.stringify(obj));
};

Sporks.prototype.empty = function (obj) {
  var empty = true;
  this.each(obj, function () {
    empty = false;
    return false; // stop loop
  });
  return empty;
};

Sporks.prototype.merge = function (obj1, obj2) {
  var merged = {},
    i;
  if (obj1) {
    for (i in obj1) {
      merged[i] = obj1[i];
    }
  }
  if (obj2) {
    for (i in obj2) {
      merged[i] = obj2[i];
    }
  }
  return merged;
};

Sporks.prototype.length = function (obj) {
  var i = 0;
  this.each(obj, function () {
    i++;
  });
  return i;
};

Sporks.prototype.keys = function (obj) {
  var keys = [];
  this.each(obj, function (value, key) {
    keys.push(key);
  });
  return keys;
};

Sporks.prototype.flip = function (obj) {
  var values = {};
  this.each(obj, function (value, key) {
    values[value] = key;
  });
  return values;
};

module.exports = new Sporks();
