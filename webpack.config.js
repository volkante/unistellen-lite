const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isProd
      ? "assets/js/[name].[contenthash].js"
      : "assets/js/[name].js",
    assetModuleFilename: "assets/[hash][ext][query]",
  },
  mode: isProd ? "production" : "development",
  devtool: isProd ? "source-map" : "eval-source-map",
  devServer: {
    static: path.join(__dirname, "dist"),
    port: 5173,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          { loader: "css-loader", options: { importLoaders: 2 } },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        type: "asset",
        parser: { dataUrlCondition: { maxSize: 8 * 1024 } },
      },
      {
        test: /\.(woff2?|ttf|eot|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: isProd && {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: isProd
        ? "assets/css/[name].[contenthash].css"
        : "assets/css/[name].css",
    }),
  ],
};
