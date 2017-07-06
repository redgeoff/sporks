'use strict';

var sporks = require('../../scripts/browser');

describe('ui', function () {

  it('should calculate absolute position', function () {
    var parentDiv = document.createElement('div'),
      div = document.createElement('div');
    parentDiv.style.position = 'absolute';
    parentDiv.style.top = '5px';
    parentDiv.style.left = '5px';
    parentDiv.appendChild(div);
    document.body.appendChild(parentDiv);
    sporks.absolutePosition(div).should.eql({ x: 5, y: 5 })
  });

  it('should load script', function () {
    return sporks.loadScript('https://code.jquery.com/jquery-3.2.1.min.js').then(function () {
      $('li').addClass('bar');
    });
  });

});
