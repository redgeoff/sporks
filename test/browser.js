'use strict';

var chai = require('chai');
chai.use(require('chai-as-promised'));
chai.should();

require('./spec/node-and-browser');

describe('browser', function () {

  require('./spec/browser');

});
