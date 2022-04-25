const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const BASE_DIR = "assets/";

module.exports = {
  entry: {
    main: "./src/assets/js/main.js",
    index: "./src/pages/index/index.js",
    about: "./src/pages/about/about.js",
  },
  output: {
    filename: BASE_DIR + "js/[name].js",
    path: path.resolve(__dirname, "dist"),
    // assetModuleFilename: "assets/",
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/index/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/pages/about/about.html",
      inject: true,
      chunks: ["about"],
      filename: "about.html",
    }),
    new MiniCssExtractPlugin({
      filename: BASE_DIR + "css/[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: BASE_DIR + "images/[name][ext][query]",
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: BASE_DIR + "fonts/[name][ext][query]",
        },
      },
      {
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        resourceQuery: /template/,
        loader: "html-loader",
      },
    ],
  },
  optimization: {
    // moduleIds: "deterministic", //prevent vendors hash from change
    runtimeChunk: "single", //split common files code
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/, //spit vendors to separete files
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
