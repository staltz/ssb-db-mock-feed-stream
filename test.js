var pull = require('pull-stream');
var tape = require('tape');
var Flume = require('flumedb');
var MemLog = require('flumelog-memory');

var db;

tape('flumedb can use() this mock', (t) => {
  db = Flume(MemLog());
  db.use('feed', require('./index')());
  t.equals(typeof db.feed.createFeedStream, 'function');
  t.end();
});

tape('createFeedStream() once drained immediately completes', (t) => {
  pull(
    db.feed.createFeedStream(),
    pull.drain(
      () => {
        t.fail('no msg is expected');
      },
      (err) => {
        t.error(err);
        t.end();
      },
    ),
  );
});
