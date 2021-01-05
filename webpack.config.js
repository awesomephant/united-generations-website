const path = require("path");
module.exports = {
  entry: {
    main: "./js/index.js",
    admin: "./admin/admin.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
};
