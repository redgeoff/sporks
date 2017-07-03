'use strict';

var Sporks = function () {};

// TODO: support dot support in attrs, e.g. rows.val.firstName
Sporks.prototype.sort = function (items, attrs) {
  items.sort(function (a, b) {
    var ret = 0;
    attrs.forEach(function (attr) {
      if (ret === 0) {
        if (!a[attr] && !b[attr]) {
          ret = 0;
        } else if (!a[attr] && b[attr]) {
          ret = 1;
        } else if (a[attr] && !b[attr]) {
          ret = -1;
        } else if (a[attr] < b[attr]) {
          ret = -1;
        } else if (a[attr] > b[attr]) {
          ret = 1;
        }
      }
    });
    return ret;
  });
  return items;
};

Sporks.prototype.intersection = function (a, b) {
  var inBoth = [];

  a.forEach(function (aItem) {
    if (b.indexOf(aItem) !== -1) { // in b as well?
      inBoth.push(aItem);
    }
  });

  return inBoth;
};

module.exports = new Sporks();
