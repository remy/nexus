const allow = require('../lib/allow');
const test = require('tape');

test('domains', t => {
  t.equal(allow('example.com'), true);
  t.equal(allow('example-123.com'), true);
  t.end();
});

test('blocked cern domains', t => {
  t.equal(allow('home.cern'), false);
  t.equal(allow('cern.ch'), false);
  t.equal(allow('private.cern.ch'), false);
  t.end();
});

test('allowed cern domains', t => {
  t.equal(allow('info.cern.ch'), true);
  t.end();
});

test('ipv6', t => {
  t.equal(allow('2001:0db8:85a3:0000:0000:8a2e:0370:7334'), false);
  t.end();
});

test('ipv4', t => {
  t.equal(allow('192.168.0.1'), true);
  t.equal(allow('8.8.8.8'), true);
  t.equal(allow('128.142.0.0'), false); // block: 128.141.0.0/16
  t.equal(allow('128.143.0.0'), true);
  t.end();
});
