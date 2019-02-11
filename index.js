const request = require('request');
const express = require('express');
cont { parse } = require('url');
const server = express();

const app = server.listen(process.env.PORT, details => {
  console.log(`listening http://localhost:${app.address.port}`);
});

function inject(body, base) {
  if (body.toUpperCase().indexOf('<BODY') === -1) {
    // damn bodyless things...
    body = '<body>' + body + '</body>';
  }

  $ = cheerio.load(body);
  $ = prepare($, base ? '/proxy?url=' + base : '', require('url'));

  return $.html();
}

function proxy(req, res, next) {
  var url = parse(req.url, true);

  if (url.pathname === '/www/proxy') {
    var url = url.query.url;

    if (!url) {
      return next();
    }
    var base = parse(url).protocol + '//' + parse(url).hostname;

    request(url, (error, response, body) => {
      base = response.request.uri.href;
      res.writeHead(200, { 'content-type': 'text/html' });
      if (!error && response.statusCode == 200) {
        return res.send(inject(body.replace(/&/g, '&amp;'), base));
      }

      res.send(404);
    });
  } else {
    next();
  }
}
