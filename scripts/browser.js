'use strict';

var collectionSporks = require('./collection'),
  functionSporks = require('./function');

var modules = {
  nodeAndBrowserSporks: require('./node-and-browser'),
  uiSporks: require('./ui')
};

// Unified API
var sporks = {};

// Mix in functions
collectionSporks.each(modules, function (mod) {
  functionSporks.mix(mod, sporks);
});

module.exports = sporks;
