'use strict';

var sporks = require('../../scripts');

describe('url', function () {

  it('should censor passwords in urls', function () {
    sporks.censorPasswordInURL('https://user:secret@example.com').should.eql(
      'https://user:**********@example.com');
    sporks.censorPasswordInURL('https://user:secret@example.com/').should.eql(
      'https://user:**********@example.com/');
    sporks.censorPasswordInURL('https://user:secret@example.com/foo/bar?yar=1#star').should
      .eql('https://user:**********@example.com/foo/bar?yar=1#star');
    sporks.censorPasswordInURL('https://user@example.com').should.eql(
      'https://user@example.com');
    sporks.censorPasswordInURL('https://example.com').should.eql('https://example.com');
    sporks.censorPasswordInURL('http://example.com').should.eql('http://example.com');
  });

});
