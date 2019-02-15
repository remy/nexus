module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy(__dirname + '/content/images');
  eleventyConfig.addPassthroughCopy(__dirname + '/content/css');
  eleventyConfig.addPassthroughCopy(__dirname + '/src/assets/fonts');

  return {
    passthroughFileCopy: true,
    dir: {
      input: __dirname + '/content/',
      output: __dirname + '/build/www',
    },
  };
};
