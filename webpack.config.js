const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    auth: "./src/auth.js",
    products: "./src/products.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./dist/pages/landing.html",
      filename: "landing.html",
      chunks: ["auth", "products"], // Include the chunks you want, or remove this line to include all
    }),
    new HtmlWebpackPlugin({
      template: "./dist/pages/login.html",
      filename: "login.html",
      // chunks: [...] // Specify chunks if necessary
    }),
    new HtmlWebpackPlugin({
      template: "./dist/pages/signup.html",
      filename: "signup.html",
      // chunks: [...] // Specify chunks if necessary
    }),
    // Add more instances as needed for other HTML files
  ],
  // Include loaders for CSS if required
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // Add loaders for other file types (images, fonts, etc.) as needed
    ],
  },
};
