var should = require('should')
  , path = require('path')
  , fwalker = require('../fwalker');

describe('walkSync', function () {
  it('should call the callback function for files recursively', function () {
    // Setup
    var dir = path.join(__dirname, 'walkTest');

    // Exercise
    var count = 0;
    fwalker.walkSync(dir, function () {
      count++;
    });

    // Verify
    count.should.equal(3);
  });

  it('should call the callback with the name as the first argument', function () {
    // Setup
    var dir = path.join(__dirname, 'walkTest');

    // Exercise
    var list = [];
    fwalker.walkSync(dir, function (name) {
      list.push(name);
    });

    // Verify
    list.should.contain('file1.txt');
    list.should.contain('dir1');
    list.should.contain('file2.txt');
  });

  it('should call the callback with the path as the second argument', function () {
    // Setup
    var dir = path.join(__dirname, 'walkTest');

    // Exercise
    var list = [];
    fwalker.walkSync(dir, function (name, path) {
      list.push(path);
    });

    // Verify
    list.should.contain(path.join(dir, 'file1.txt'));
    list.should.contain(path.join(dir, 'dir1'));
    list.should.contain(path.join(dir, 'dir1/file2.txt'));
  });

  it('should call the callback with the value that indicates whether the node is a directory as the third argument', function () {
    // Setup
    var dir = path.join(__dirname, 'walkTest');

    // Exercise
    var directories = 0, nonDirectories = 0;
    fwalker.walkSync(dir, function (name, path, isDir) {
      if (isDir) {
        directories++;
      }
      else {
        nonDirectories++;
      }
    });

    // Verify
    directories.should.equal(1);
    nonDirectories.should.equal(2);
  });
});
