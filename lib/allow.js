const readFileSync = require('fs').readFileSync;

const whitelist = readFileSync(__dirname + '/../whitelist', 'utf8')
  .split('\n')
  .map(_ => _.trim());

module.exports = function allow(hostname) {
  if (hostname && hostname.endsWith('cern.ch')) {
    if (whitelist.includes(hostname)) {
      return true;
    }
    return false;
  }

  return true;
};
