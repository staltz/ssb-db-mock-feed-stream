var pull = require('pull-stream');
var Reduce = require('flumeview-reduce');

module.exports = function (db) {
  return function (log, name) {
    var index = Reduce(1, function () {})(log, name);
    index.methods = index.methods || {};
    index.methods.createFeedStream = 'source';
    index.createFeedStream = function () {
      return pull.empty();
    };
    return index;
  };
};
