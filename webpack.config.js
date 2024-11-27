const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptWebpackPlugin = require("html-inline-script-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    publicPath: "",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  watchOptions: {
    aggregateTimeout: 1000,
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|glb|gltf|mp3|wav)$/i,
        type: "asset/inline",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: "body",
    }),
    // new HtmlInlineScriptWebpackPlugin(),
  ],
  devServer: {
    static: path.resolve(__dirname, "dist"),
    open: false,
    compress: true,
    port: 9000,
    liveReload: true,
  },
};

