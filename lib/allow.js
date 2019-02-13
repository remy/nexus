const readFileSync = require('fs').readFileSync;
const ipRangeCheck = require('ip-range-check');

const whitelist = readFileSync(__dirname + '/../whitelist', 'utf8')
  .split('\n')
  .map(_ => _.trim())
  .filter(_ => !_.startsWith('#'))
  .filter(Boolean);

const ipRE = /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/;

module.exports = function allow(hostname = '') {
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
    return ipRangeCheck(hostname, whitelist);
  }

  if (hostname.endsWith('cern.ch') || hostname.endsWith('.cern')) {
    return whitelist.includes(hostname);
  }

  return true;
};
