const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    // fire: "./src/index.js",
    auth: "./src/auth.js",
    products: "./src/products.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  watch: true,
};
