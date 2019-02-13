const readFileSync = require('fs').readFileSync;
const ipRangeCheck = require('ip-range-check');

const whitelist = readFileSync(__dirname + '/../whitelist', 'utf8')
  .split('\n')
  .map(_ => _.trim())
  .filter(Boolean);

module.exports = function allow(hostname) {
  hostname = hostname.toLowerCase();

  // don't allow ipv6
  if (hostname.includes(':')) {
    return false;
  }

  // TODO ip

  if (
    hostname &&
    (hostname.endsWith('cern.ch') || hostname.endsWith('.cern'))
    // FIXME what about IP addresses…
  ) {
    if (whitelist.includes(hostname)) {
      return true;
    }
    return false;
  }

  return true;
};
