const cheerio = require('cheerio');

module.exports = function prepare(body) {
  if (body.toUpperCase().indexOf('<BODY') === -1) {
    // damn bodyless things...
    body = '<body>' + body + '</body>';
  }

  const $ = cheerio.load(body);
  // strip particular elements
  $(
    'style,iframe,frame,frameset,img,hr,br,video,input,select,option,optgroup'
  ).remove();
  $('link').remove();
  $('[style]').each(function() {
    $(this).removeAttr('style');
  });

  $('[class]').each(function() {
    $(this).removeAttr('class');
  });

  // expose the content of scripts
  $('script').each(function() {
    $(this).attr('type', 'text/plain');
  });

  // node compat
  return { title: $('title').text(), body: $('body').html() };
};
