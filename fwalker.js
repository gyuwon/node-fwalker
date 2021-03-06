/**
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Yi Gyuwon <gyuwon@live.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */

var fs = require('fs')
  , path = require('path');

/**
 * Initialize a new instance of the simple file traversal modules.
 */
function Walker () {
  var self = this;

  var walkSync = function (dir, trace, callback) {
    fs.readdirSync(dir).forEach(function (name) {
      var file = path.join(dir, name)
        , stat = fs.lstatSync(file)
        , isDir = stat.isDirectory()
        , _trace = trace;
      try {
        callback(name, file, isDir, function () {
          return _trace.slice(0);
        });
      }
      finally {
        _trace = null;
      }
      if (isDir) {
        trace.push(name);
        try {
          walkSync(file, trace, callback);
        }
        finally {
          trace.pop();
        }
      }
    });
  };

  /**
   * Traverse the directory synchronously.
   *
   * Parameters
   * - dir: A directory to traverse
   * - callback: A function to be called for each file recursively
   *
   * Returns: The list of information of files contained in 'dir'
   */
  self.walkSync = function (dir, callback) {
    if (typeof callback != 'function') {
      throw new Error("'callback' is not a function.");
    }
    walkSync(dir, [], callback);
  };
}

module.exports = new Walker();
