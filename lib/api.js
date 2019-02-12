const express = require('express');
const { parse } = require('url');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const prepare = require('./prepare');
const allow = require('./allow');
const router = express.Router();

module.exports = router;

// if (process.env.NODE_ENV === 'development') {
router.use(cors());
// }

router.use(bodyParser.json({ limit: '2kb' }));

router.post('/', (req, res, next) => {
  const url = req.body.url;

  console.log('request for', url);

  if (!url) {
    return res.status(404).json({ error: 'not found' });
  }

  const { protocol, hostname } = parse(url);

  if (!hostname) {
    return res.status(400).json({ error: 'bad url' });
  }

  if (!allow(hostname)) {
    return res.status(404).json({ error: 'not found' });
  }

  // let base = `${protocol}//${hostname}`;

  request(url, (error, response, body) => {
    const status = response ? response.status : 500;
    if (!error && response.statusCode == 200) {
      const base = response.request.uri.href;
      console.log('requested', base);
      return res.status(200).json(process(body.replace(/&/g, '&amp;'), base));
    }

    res.status(status).json({ error });
  });
});

function process(body, base) {
  if (body.toUpperCase().indexOf('<BODY') === -1) {
    // damn bodyless things...
    body = '<body>' + body + '</body>';
  }

  return prepare(body, base);
}
