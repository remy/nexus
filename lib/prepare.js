const cheerio = require('cheerio');

module.exports = function prepare(body, location) {
  const $ = cheerio.load(body);
  // strip particular elements
  $('style,iframe,frame,frameset,img,hr,br,video').remove();
  $('link[rel=stylesheet]').remove();
  $('[style]').each(function() {
    $(this).removeAttr('style');
  });

  // expose the content of scripts
  $('script').each(function() {
    $(this).attr('type', 'text/plain');
  });

  // node compat
  return $;
};
