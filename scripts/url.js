'use strict';

var url = require('url');

var Sporks = function () {};

Sporks.prototype.censorPasswordInURL = function (urlString) {
  var u = url.parse(urlString);

  if (u.auth) {
    var splitAuth = u.auth.split(':');

    // Password specified?
    if (splitAuth[1]) {
      splitAuth[1] = '**********';
      u.auth = splitAuth.join(':');
    }

  }

  var href = url.format(u);

  // No trailing slash in original?
  if (urlString[urlString.length - 1] !== '/') {
    // Remove any extra trailing slash added by URL
    href = href.replace(/\/$/, '');
  }

  return href;
};

module.exports = new Sporks();
