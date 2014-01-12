var should = require('should')
  , path = require('path')
  , fwalker = require('../fwalker');

describe('walkSync', function () {
  it('should call the callback function for files recursively', function () {
    // Setup
    var dir = path.join(__dirname, 'walkTest');

    // Exercise
    var list = [];
    fwalker.walkSync(dir, function (f) {
      list.push(f.getFullPath());
    });

    // Verify
    list.length.should.equal(3);
    list.should.contain('file1.txt');
    list.should.contain('dir1');
    list.should.contain('dir1/file2.txt');
  });
});
