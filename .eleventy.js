module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy(__dirname + '/content/images');
  eleventyConfig.addPassthroughCopy(__dirname + '/content/css');

  return {
    passthroughFileCopy: true,
    dir: {
      input: __dirname + '/content/',
      output: __dirname + '/build/www',
    },
  };
};
