const cheerio = require('cheerio');

module.exports = function prepare(body) {
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

  // node compat
  return { title: $('title').text(), body: $('body').html() };
};
