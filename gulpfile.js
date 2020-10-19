"use strict";
const { series, src, dest } = require("gulp");
const srcset = require("gulp-srcset").default;
const imageminWebp = require("imagemin-webp");
const imageminMozjpeg = require('imagemin-mozjpeg');

function images() {
  return src("assets/uploads/*.{jpg,png}")
    .pipe(
      srcset(
        [
          {
            width: [2000, 1500, 1000, 500],
            format: ["jpg"],
            scalingUp: false,
            optimization: {
              jpg: imageminMozjpeg({
                quality: 90,
              }),
            },
          },
        ],

        {
          skipOptimization: false,
        }
      )
    )
    .pipe(dest("_site/assets/uploads"));
}

exports.images = series(images);
