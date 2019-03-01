const cheerio = require('cheerio');
const { resolve, parse } = require('url');
const { openSearch, getIsIndex } = require('./isindex');

module.exports = async function prepare(body, base) {
  if (body.toUpperCase().indexOf('<BODY') === -1) {
    // damn bodyless things...
    body = '<body>' + body + '</body>';
  }

  let isindex = undefined;

  const $ = cheerio.load(body);

  const { hostname, pathname } = parse(base);

  if (pathname === '/') {
    const openSearchElement = $('link[rel="search"]');
    if (openSearchElement.length) {
      const osURL = resolve(base, openSearchElement.attr('href'));
      isindex = await openSearch(osURL);
    } else {
      isindex = getIsIndex(base);
    }
  } else {
    const isIndexEl = $('ISINDEX');
    if (isIndexEl.length) {
      isindex = (isIndexEl.attr('action') || hostname) + '?';
    }
  }

  // strip particular elements
  $(
    'style,iframe,frame,frameset,img,hr,br,video,input,select,option,optgroup,script,svg,button,link'
  ).remove();
  $('[style]').each(function() {
    $(this).removeAttr('style');
  });

  $('[class]').each(function() {
    $(this).removeAttr('class');
  });

  let nextId = 0;
  const nextIdEl = $('nextid');
  if (nextIdEl.length) {
    nextId = parseInt(nextIdEl.attr('n'), 10);
    if (!nextId)
      nextId = parseInt(Object.keys($('nextid').get()[0].attribs).pop(), 10);
  }

  // node compat
  return {
    base,
    isindex,
    title: $('title').text(),
    body: $('body').html(),
    nextId,
    links: $('a')
      .get()
      .map(_ => resolve(base, _.attribs.href || '')),
  };
};
