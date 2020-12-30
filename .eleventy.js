const pluginSass = require("eleventy-plugin-sass");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const md = new markdownIt();

module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection("events", function (collectionApi) {
    let items = collectionApi.getFilteredByGlob(["./events/*.md"]);
    let sorted = items.sort((a, b) => {
      if (a.data.date < b.data.date) {
        return 1;
      } else if (a.data.date > b.data.date) {
        return -1;
      }
      return 0;
    });
    return sorted;
  });
  eleventyConfig.addCollection("news", function (collectionApi) {
    return collectionApi.getFilteredByGlob(["./news/*.md"]);
  });
  eleventyConfig.addCollection("research", function (collectionApi) {
    return collectionApi.getFilteredByGlob(["./research/*.md"]);
  });
  eleventyConfig.addCollection("books", function (collectionApi) {
    return collectionApi.getFilteredByGlob(["./books/*.md"]);
  });

  eleventyConfig.addFilter("renderMarkdown", function (value) {
    return md.render(value);
  });

  eleventyConfig.addPassthroughCopy("./assets");
  eleventyConfig.addPassthroughCopy("./admin");
  eleventyConfig.addPassthroughCopy("./dist");
  eleventyConfig.addPassthroughCopy("*.png");
  eleventyConfig.addPassthroughCopy("/*.xml");
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addWatchTarget("./dist/main.js");
  eleventyConfig.addPassthroughCopy({ "./admin/config.yml": "config.yml" });

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginSass, {});
};
