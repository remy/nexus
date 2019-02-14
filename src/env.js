let HOST = process.env.HOST;
// strip a trailing slash
if (HOST.endsWith('/')) HOST = HOST.slice(0, -1);

let API = process.env.API || HOST + '/api';

if (API.endsWith('/')) API = API.slice(0, -1);

export { API, HOST };
