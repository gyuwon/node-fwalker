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
      list.push(f);
    });

    // Verify
    list.length.should.equal(3);
  });

  describe('join', function () {
    it('should return the relative path of a file or a directory', function () {
      // Setup
      var dir = path.join(__dirname, 'walkTest');

      // Exercise
      var list = [];
      fwalker.walkSync(dir, function (f) {
        list.push(f.join());
      });

      // Verify
      list.should.contain('file1.txt');
      list.should.contain('dir1');
      list.should.contain('dir1/file2.txt');
    });
  });

  describe('joinDir', function () {
    it('should return the container directory for a file or the relative path for a directory', function () {
      // Setup
      var dir = path.join(__dirname, 'walkTest');

      // Exercise
      var list = [];
      fwalker.walkSync(dir, function (f) {
        list.push(f.joinDir());
      });

      // Verify
      list.should.contain('.');
      list.should.contain('dir1');
      list.should.contain('dir1');
    });
  });
});
