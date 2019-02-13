const readFileSync = require('fs').readFileSync;
const ipRangeCheck = require('ip-range-check');

function load(filename) {
  let file = null;
  try {
    file = readFileSync(__dirname + '/../' + filename, 'utf8');
  } catch (e) {
    return [];
  }
  return file
    .split('\n')
    .map(_ => _.trim())
    .filter(_ => !_.startsWith('#'))
    .filter(Boolean);
}

const allow = load('allow');
const block = load('block');

const ipRE = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

module.exports = (hostname = '') => {
  hostname = hostname.toLowerCase().trim();

  // shouldn't happen, but…
  if (!hostname) {
    return false;
  }

  // don't allow ipv6
  if (hostname.includes(':')) {
    return false;
  }

  // if it looks like an IP address, then check it's in a valid range
  if (ipRE.test(hostname)) {
    return !ipRangeCheck(hostname, block);
  }

  if (block.includes(hostname)) {
    return false;
  }

  if (hostname.endsWith('cern.ch') || hostname.endsWith('.cern')) {
    return allow.includes(hostname);
  }

  return true;
};
