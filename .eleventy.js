const pluginRss = require("@11ty/eleventy-plugin-rss")
const markdownIt = require("markdown-it")
const md = new markdownIt()
const jsdom = require("jsdom")
const { JSDOM } = jsdom

module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("env", process.NODE_ENV)
  eleventyConfig.addCollection("events", function (collectionApi) {
    let items = collectionApi.getFilteredByGlob(["./events/*.md"])
    let sorted = items.sort((a, b) => {
      if (a.data.date < b.data.date) {
        return 1
      } else if (a.data.date > b.data.date) {
        return -1
      }
      return 0
    })
    return sorted
  })
  eleventyConfig.addCollection("news", function (collectionApi) {
    const items = collectionApi.getFilteredByGlob(["./news/*.md"])
    let sorted = items.sort((a, b) => {
      if (a.data.date < b.data.date) {
        return 1
      } else if (a.data.date > b.data.date) {
        return -1
      }
      return 0
    })
    return sorted
  })
  eleventyConfig.addCollection("research", function (collectionApi) {
    const items = collectionApi.getFilteredByGlob(["./research/*.md"])
    let sorted = items.sort((a, b) => {
      if (a.data.order < b.data.order) {
        return -1
      } else if (a.data.order > b.data.order) {
        return 1
      }
      return 0
    })
    return sorted
  })
  eleventyConfig.addCollection("books", function (collectionApi) {
    const items = collectionApi.getFilteredByGlob(["./books/*.md"])
    let sorted = items.sort((a, b) => {
      if (a.data.date < b.data.date) {
        return 1
      } else if (a.data.date > b.data.date) {
        return -1
      }
      return 0
    })
    return sorted
  })
  eleventyConfig.addCollection("pages", function (collectionApi) {
    const items = collectionApi.getFilteredByGlob(["./books/*.md"])
    return items
  })
  eleventyConfig.addTransform("resolveImageTitles", function (content, outputPath) {
    if (outputPath.endsWith(".html")) {
      const dom = new JSDOM(content)
      let transformed = ""
      const images = dom.window.document.querySelectorAll(".post--content > p > img")
      images.forEach((img) => {
        let src = img.getAttribute("src")
        img.setAttribute("data-full-src", src + "?nf_resize=fit&w=2000")
        src += "?nf_resize=fit&w=1000"
        img.setAttribute("src", src)
        if (img.getAttribute("title") !== "") {
          let caption = dom.window.document.createElement("span")
          let title = img.getAttribute("title")
          caption.innerHTML = title
          caption.classList.add("caption")
          img.insertAdjacentElement("afterend", caption)
        }
      })
      transformed = dom.serialize()
      return transformed
    }
    return content
  })
  eleventyConfig.addShortcode("gallery", function (data) {
    let gallery = JSON.parse(decodeURIComponent(data))
    items = gallery.map((item) => {
      let caption = ""
      if (item.caption) {
        caption = item.caption
      }
      return `<figure class="gallery--item">
      <img data-full-src="${item.image}?nf_resize=fit&w=2000" src="${item.image}?nf_resize=fit&w=1000" alt="${item.alt}">
      <figcaption>${caption}</figcaption>
      </figure>`
    })

    return `<div class="gallery" data-count="">${items.join("\n")}</div>`
  })

  eleventyConfig.addShortcode("embed", function (data) {
    let embed = JSON.parse(decodeURIComponent(data))
    return `<figure class="embed">
      ${embed.code}
      <figcaption>${embed.caption}</figcaption>
    </figure>`
  })

  eleventyConfig.addFilter("renderMarkdown", function (value) {
    return md.render(value)
  })

  eleventyConfig.addFilter("readingTime", function (s) {
    const words = s.split(" ")
    const minutes = words.length / 200
    return minutes.toFixed(1)
  })

  eleventyConfig.addPassthroughCopy("./assets")
  eleventyConfig.addPassthroughCopy("./admin")
  eleventyConfig.addPassthroughCopy("./dist")
  eleventyConfig.addPassthroughCopy("*.png")
  eleventyConfig.addPassthroughCopy("/*.xml")
  eleventyConfig.addPassthroughCopy("favicon.ico")
  eleventyConfig.addWatchTarget("./dist/main.js")
  eleventyConfig.addWatchTarget("./js/**/**.js")
  eleventyConfig.addPassthroughCopy({ "./admin/config.yml": "config.yml" })

  eleventyConfig.addPlugin(pluginRss)
}
