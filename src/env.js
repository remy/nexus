let HOST = process.env.HOST || window.location.origin;
// strip a trailing slash
if (HOST.endsWith('/')) HOST = HOST.slice(0, -1);

let API = process.env.API || HOST + '/api';
if (API.endsWith('/')) API = API.slice(0, -1);

const PATH = HOST + '/browser';

const SHA = process.env.npm_package_gitHead;
console.groupCollapsed('version', SHA.substr(0, 8));
console.log('SHA %s', SHA);
console.log('HOST %s', HOST);
console.log('API %s', API);
console.log(`https://gitlab.cern.ch/nexus-project/nexus-browser/commit/${SHA}`);

console.groupEnd('version');

export { API, HOST, PATH };
