const test = require('tape');
const prepare = require('../lib/prepare');
const _request = require('request');

const request = (...args) =>
  new Promise((resolve, reject) => {
    args.push((error, response, body) => {
      if (error) {
        return reject(error);
      }

      resolve(body);
    });
    _request(...args);
  });

test('openSearch', async t => {
  const url = 'https://en.m.wikipedia.org';
  const html = await request(url);
  t.assert(
    await prepare(html, url),
    'https://en.wikipedia.org/w/index.php?title=Special:Search&search={searchTerms}'
  );
  // console.log(r);
  t.end();
});
