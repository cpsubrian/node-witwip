var witwip = require('../'),
    assert = require('assert');

describe('basic functionality', function() {
  var path, info;

  it('can find package.json of a base module', function() {
    path = witwip(module);
    info = require(path);
    assert.equal(info.name, 'basic');
  });

  it('can find package.json of local module', function() {
    path = witwip(module, './local/chief');
    info = require(path);
    assert.equal(info.name, 'chief');
  });

  it('can find package.json recursing out of a sub-folder', function() {
    path = witwip(__dirname + '/local/chief/subfolder/deeper');
    info = require(path);
    assert.equal(info.name, 'chief');
  });

  it('can find package.json of a module', function() {
    path = witwip(module, 'carmen');
    info = require(path);
    assert.equal(info.name, 'carmen');
  });

  it('throws when a match cannot be found', function() {
    assert.throws(function(){
      path = witwip(__dirname, './local/double-trouble');
    });
  });

  it('can return the directory instead of the filepath', function() {
    path = witwip.dir(module, 'carmen');
    assert.equal(path, __dirname + '/node_modules/carmen');
  });

});