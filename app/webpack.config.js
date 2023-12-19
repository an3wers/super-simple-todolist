const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TeserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { DefinePlugin } = require("webpack");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction
  ? MiniCssExtractPlugin.loader
  : "style-loader";

require("dotenv").config({ path: `.env.${process.env.NODE_ENV}` });

let env = {
  __VUE_OPTIONS_API__: true,
  __VUE_PROD_DEVTOOLS__: true,
};

for (const key in process.env) {
  if (key == "NODE_ENV" || key == "BASE_URL" || /^VUE_APP_/.test(key)) {
    env[key] = process.env[key];
  }
}

const config = {
  mode: isProduction ? "production" : "development",
  entry: "./src/main.ts",
  output: {
    clean: true,
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/[name].[contenthash:8].bundle.js",
    chunkFilename: "static/js/[name].[contenthash:8].chunk.js",
    assetModuleFilename: "static/[name].[hash:8].[ext]",
  },
  devServer: {
    port: 5173,
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: "vue-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [stylesHandler, "css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.tsx?/i,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/],
              configFile: path.resolve(__dirname, "tsconfig.json"),
            },
          },
        ],
      },
      {
        test: /\.m?js$/i,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(png|jpe?g|bmp|gif|webp|svg)$/i,
        type: "asset",
        generator: {
          filename: "./static/image/[name][hash][ext][query]",
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "static/font/[name][hash][ext]",
        },
      },
      {
        test: /.(mp4|mp3|webm)$/,
        type: "asset/resource",
        generator: {
          filename: "static/media/[name][ext]",
        },
      },
    ],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    mainFiles: ["index"],
    extensions: [".ts", ".tsx", "..."],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack5+vue示例",
      filename: "index.html",
      template: "./public/index.html",
      minify: isProduction
        ? {
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            collapseWhitespace: true,
            minifyCSS: true,
            minifyJS: {
              mangle: {
                toplevel: true,
              },
            },
          }
        : false,
    }),
    new MiniCssExtractPlugin({
      filename: "static/css/[contenthash].css",
      chunkFilename: "static/css/[contenthash]_chunk.css",
    }),
    new VueLoaderPlugin(),
    new DefinePlugin({
      "process.env": JSON.stringify(env),
    }),
  ],
};

module.exports = () => {
  if (isProduction) {
    config.optimization = {
      usedExports: true,
      concatenateModules: true,
      minimize: true,
      splitChunks: {
        chunks: "all",
      },
      minimizer: [
        new TeserWebpackPlugin({
          parallel: true,
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
            compress: {
              arguments: true,
              unused: true,
              drop_console: ["log"],
              drop_debugger: true,
            },
            mangle: true,
          },
        }),
        new CssMinimizerPlugin({
          parallel: true,
        }),
      ],
    };
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "public"),
            to: "./",
            globOptions: {
              dot: true,
              gitignore: true,
              ignore: ["**/index.html"],
            },
          },
        ],
      })
    );

    config.externals = {
      vue: "Vue",
      "vue-router": "VueRouter",
    };
  }
  return config;
};
