const express = require('express');
const { parse } = require('url');
const request = require('request');
const prepare = require('./prepare');
const allow = require('./allow');
const router = express.Router();

module.exports = router;

router.post('/', (req, res, next) => {
  var url = req.body.url;

  if (!url) {
    return res.status(404).json({ error: 'not found' });
  }

  const { protocol, hostname } = parse(url);

  if (!allow(hostname)) {
    return res.status(404).json({ error: 'not found' });
  }

  // let base = `${protocol}//${hostname}`;

  request(url, (error, response, body) => {
    const base = response.request.uri.href;
    console.log('requested', base);
    if (!error && response.statusCode == 200) {
      return res
        .status(200)
        .json({ body: inject(body.replace(/&/g, '&amp;'), base) });
    }

    res.status(response.statusCode).json({ error });
  });
});

function inject(body, base) {
  if (body.toUpperCase().indexOf('<BODY') === -1) {
    // damn bodyless things...
    body = '<body>' + body + '</body>';
  }

  return prepare(body, base).html();
}
