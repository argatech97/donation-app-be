/* eslint-disable @typescript-eslint/no-var-requires */
const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

function webpackConfig(env, argv) {
  const isDevelopment = argv.mode === "development";
  return {
    entry: "./src/index.ts", // Adjust the entry point as needed
    mode: isDevelopment ? "development" : "production",
    output: {
      filename: "index.js",
      path: __dirname + "/dist",
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      plugins: [new TsconfigPathsPlugin()],
    },
    target: "node", // Set the target to node
    externals: [nodeExternals()], // Exclude node_modules from the bundle
    module: {
      rules: [
        {
          test: /\.ts?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
  };
}

module.exports = webpackConfig;
