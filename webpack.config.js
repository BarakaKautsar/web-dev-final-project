const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: {
    auth: "./src/auth.js",
    products: "./src/products.js",
    cart: "./src/cart.js",
    order: "./src/order.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html",
      filename: "index.html",
      chunks: ["products"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/landing.html",
      filename: "landing.html",
      chunks: ["auth"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/login.html",
      filename: "login.html",
      chunks: ["auth"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/signup.html",
      filename: "signup.html",
      chunks: ["auth"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/user.html",
      filename: "user.html",
      chunks: ["auth"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/cart.html",
      filename: "cart.html",
      chunks: ["cart"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/order.html",
      filename: "order.html",
      chunks: ["order"],
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
