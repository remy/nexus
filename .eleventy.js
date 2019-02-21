module.exports = function(eleventyConfig) {
  const copy = [
    '/content/robots.txt',
    '/content/humans.txt',
    '/content/css',
  ].map(filename => {
    eleventyConfig.addPassthroughCopy(__dirname + filename);
  });

  return {
    passthroughFileCopy: true,
    dir: {
      input: __dirname + '/content/',
      output: __dirname + '/build/www',
    },
  };
};
