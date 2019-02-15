const cheerio = require('cheerio');
const { resolve } = require('url');

module.exports = function prepare(body, base) {
  if (body.toUpperCase().indexOf('<BODY') === -1) {
    // damn bodyless things...
    body = '<body>' + body + '</body>';
  }

  const $ = cheerio.load(body);
  // strip particular elements
  $(
    'style,iframe,frame,frameset,img,hr,br,video,input,select,option,optgroup,script,svg'
  ).remove();
  $('link').remove();
  $('[style]').each(function() {
    $(this).removeAttr('style');
  });

  $('[class]').each(function() {
    $(this).removeAttr('class');
  });

  let nextId = 0;
  if ($('nextid').length) {
    nextId = parseInt(Object.keys($('nextid').get()[0].attribs).pop(), 10);
  }

  // node compat
  return {
    base,
    title: $('title').text(),
    body: $('body').html(),
    nextId,
    links: $('a')
      .get()
      .map(_ => resolve(base, _.attribs.href || '')),
  };
};
