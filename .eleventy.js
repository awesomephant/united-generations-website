const pluginSass = require("eleventy-plugin-sass");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const md = new markdownIt();
const siteSettings = require("./_data/settings.json");
const fs = require("fs");

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
  eleventyConfig.addFilter("srcset", function (url, format) {
    const sizes = [500, 1000, 1500, 2000];
    let file = url.split(".");
    let output = [];
    sizes.forEach((s) => {
      let filename = `${file[0]}@${s}w.${format}`;
      try {
        fs.accessSync(`./_site/${filename}`, fs.constants.R_OK);
        output.push(`${filename} ${s}w`);
      } catch (err) {
        // console.log(`Media file ${filename} does not exist, skipping.`);
      }
    });
    return output.join(",");
  });
  eleventyConfig.addFilter("resize", function (url, size) {
    let file = url.split(".");
    let output = "";
    let filename = `${file[0]}@${size}w.jpg`;
    let path = `_site${filename}`;
    try {
      fs.accessSync(path, fs.constants.R_OK);
      output = `${filename}`;
    } catch (err) {
      console.log(`Media file ${path} does not exist, skipping.`);
    }
    return output;
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
