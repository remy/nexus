const express = require('express');
const { parse } = require('url');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const prepare = require('./prepare');
const allow = require('./allow');
const router = express.Router();

module.exports = router;

if (process.env.NODE_ENV === 'development') {
  router.use(cors());
}

router.use(bodyParser.json({ limit: '2kb' }));

router.post('/', (req, res, next) => {
  const url = req.body.url;

  console.log('request for', url);

  if (!url) {
    return res.status(404).json({ error: 'not found' });
  }

  const { protocol, hostname, pathname } = parse(url);

  if (!hostname) {
    return res.status(400).json({ error: 'bad url' });
  }

  if (!allow(hostname)) {
    return res.status(404).json({ error: 'not found' });
  }

  // let base = `${protocol}//${hostname}`;

  request(url, (error, response, body) => {
    const status = response && response.statusCode ? response.statusCode : 500;

    if (!error && status == 200) {
      const base = response.request.uri.href;
      console.log('requested', base);
      return res.status(200).json(prepare(body.replace(/&/g, '&amp;'), base));
    }

    if (status === 404) {
      return res.status(404).json({
        title: '404 Not Found',
        body: `<h1>Not Found</h1>\n<p>The requested URL ${pathname} was not found on this server.</p>`,
      });
    }

    res.status(status).json({ error });
  });
});
