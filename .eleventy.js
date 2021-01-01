const pluginSass = require("eleventy-plugin-sass");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const markdownIt = require("markdown-it");
const md = new markdownIt();
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

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
    const items = collectionApi.getFilteredByGlob(["./news/*.md"]);
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
  eleventyConfig.addCollection("research", function (collectionApi) {
    return collectionApi.getFilteredByGlob(["./research/*.md"]);
  });
  eleventyConfig.addCollection("books", function (collectionApi) {
    const items = collectionApi.getFilteredByGlob(["./books/*.md"]);
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
  eleventyConfig.addTransform(
    "resolveImageTitles",
    function (content, outputPath) {
      if (outputPath.endsWith(".html")) {
        const dom = new JSDOM(content);
        let transformed = "";
        const images = dom.window.document.querySelectorAll(
          ".post--content img"
        );
        images.forEach(img => {
          if (img.getAttribute("title") !== ""){
            let caption = dom.window.document.createElement("span")
            let title = img.getAttribute("title")
            caption.innerHTML = title;
            caption.classList.add("caption")
            console.log(title)
            img.insertAdjacentElement("afterend", caption)
          }
        })
        transformed = dom.serialize();
        return transformed;
      }
      return content;
    }
  );
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
