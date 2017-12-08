'use strict';

var collectionSporks = require('./collection'),
  functionSporks = require('./function');

var modules = {
  arraySporks: require('./array'),
  collectionSporks: collectionSporks,
  errorSporks: require('./error'),
  functionSporks: functionSporks,
  objectSporks: require('./object'),
  promiseSporks: require('./promise-sporks'),
  testSporks: require('./test'),
  urlSporks: require('./url')
};

// Unified API
var sporks = {};

// Mix in functions
collectionSporks.each(modules, function (mod) {
  functionSporks.mix(mod, sporks);
});

module.exports = sporks;
