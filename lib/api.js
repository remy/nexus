const express = require('express');
const { parse } = require('url');
const request = require('request');
const createError = require('http-errors');

const cors = require('cors');
const prepare = require('./prepare');
const allow = require('./allow');
const router = express.Router();

const supportedEntities = ['amp', 'lt', 'gt', 'quot'];

const notFound = (pathname) =>
  `<h1>Not Found</h1>\n<p>The requested URL ${pathname} was not found on this server.</p>`;

module.exports = router;

// cors isn't needed in production as it'll save
if (process.env.NODE_ENV === 'development') {
  router.use(cors());
}

router.get('/', (req, res) => {
  let url = req.query.url;

  if (!url.includes('://')) {
    // add missing protocol
    url = 'http://' + url;
  }

  console.log('request for', url);

  if (!url) {
    return res.status(400).json({
      error: 'not found',
      title: 400,
      body: createError(400).message,
    });
  }

  const { hostname, pathname } = parse(url);

  if (!hostname) {
    return res.status(400).json({
      error: 'not found',
      title: 400,
      body: createError(400).message,
    });
  }

  if (!allow(hostname)) {
    return res
      .status(404)
      .json({ title: 'Not Found', body: notFound(pathname) });
  }

  request(
    {
      headers: {
        'User-Agent': 'CERN-NextStep-WorldWideWeb.app/1.1  libwww/2.07',
      },
      url,
    },
    async (error, response, body) => {
      // look at where our final http request connection landed
      // and revalidate in case there was a redirect or a hack
      // like adding a period to the end of the hostname
      if (!allow(response.connection.servername)) {
        return res
          .status(404)
          .json({ title: 'Not Found', body: notFound(pathname) });
      }

      try {
        const status =
          response && response.statusCode ? response.statusCode : 500;

        if (!error && status == 200) {
          const base = response.request.uri.href;
          return res.status(200).json(
            await prepare(
              body.replace(/&(.*?);/g, (all, match) => {
                if (supportedEntities.includes(match.toLowerCase()) === 'amp') {
                  return match + ';';
                }
                return '&amp;' + match + ';';
              }),
              base
            )
          );
        }

        if (status === 404) {
          return res
            .status(404)
            .json({ title: 'Not Found', body: notFound(pathname) });
        }

        res.status(400).json({ title: 'Bad request', body: error.message });
        return;
      } catch (e) {
        res.status(500).json({
          title: 500,
          body: `<h1>Internal Server Fangle</h1>\n<p>The requested URL ${pathname} was made this server go "no".</p>`,
        });
      }
    }
  );
});
