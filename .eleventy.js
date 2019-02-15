module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('content/images');
  eleventyConfig.addPassthroughCopy('content/css');
  eleventyConfig.addPassthroughCopy('src/assets/fonts');

  return {
    passthroughFileCopy: true,
    dir: {
      input: 'content/',
      output: 'build/www',
    },
  };
};
