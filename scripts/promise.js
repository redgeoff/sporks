'use strict';

// A wrapper that can be discarded once Promises become standard across all recent browser versions

var Promise = require('bluebird');

// Turn off the warnings as they are often reported when they should not
Promise.config({
  warnings: false
});

module.exports = Promise;
