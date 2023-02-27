# United Generations Website

This is a static site built with Eleventy and deployed to netlify. Javascript is compiled with webpack.

## Development Setup

Run ```yarn``` to pull down dependencies, ```yarn run start``` to start a local development server. ```yarn run build``` to create an optimised production build.

We're using Netlify CMS and Netlify hosting. We're using Netlify's built-in image transformation pipeline, which lets us write things like ```{{book.data.featured_image.image}}?nf_resize=fit&w=1000&h=600```. 
