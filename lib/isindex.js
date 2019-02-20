/*
This file offers a manual mapping of ISINDEX-like queries
*/

const _request = require('request');
const cheerio = require('cheerio');
const allow = require('./allow');
const { parse } = require('url');

const LRU = require('lru-cache');
const cache = new LRU({
  max: 500,
  maxAge: 1000 * 60 * 60,
});

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

exports.openSearch = async function(url) {
  const cached = cache.get(url);

  // reduce the additional http hits
  if (cached) {
    return cached;
  }

  const { hostname } = parse(url);
  if (!allow(hostname)) {
    // unlikely, but worth checking
    return;
  }
  const xml = await request(url);
  const $ = cheerio.load(xml);
  const entry = $('Url[type="text/html"]').attr('template');
  cache.set(url, entry);
  return entry;
};

exports.getIsIndex = function(hostname) {
  if (hostname.includes('google.')) {
    return hostname + '/search?q={searchTerms}';
  }

  if (hostname.includes('duckduckgo.')) {
    return hostname + '/?q={searchTerms}';
  }

  if (hostname.includes('amazon.')) {
    return hostname + '/s?k={searchTerms}';
  }
};
