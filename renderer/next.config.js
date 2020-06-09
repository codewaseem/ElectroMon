const AntdScssThemePlugin = require("@codewaseem/antd-scss-theme-plugin");
const fs = require("fs");
const path = require("path");
const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");
const optimizedImages = require("next-optimized-images");
// Where your antd-custom.less file lives
const themeVariables = path.resolve(__dirname, "./theme/antd-custom.scss");

const nextConfig = {
  distDir: ".next",
  webpack: (config) => {
    config.target = "electron-renderer";
  },
};

const plugins = [
  withSass({
    cssModules: true,

    ...withLess({
      lessLoaderOptions: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
      cssLoaderOptions: {
        importLoaders: 3,
        localIdentName: "[local]___[hash:base64:5]",
      },

      webpack: (config, { isServer, dev }) => {
        //Make Ant styles work with less
        config.plugins.push(new AntdScssThemePlugin(themeVariables));
        console.log("\n\n\nBEFORE");
        console.log("isServer", isServer);
        config.module.rules.map((rule) => {
          const given = RegExp(rule.test).toString();
          const less = RegExp(/\.less$/).toString();
          const sass = RegExp(/\.sass$/).toString();
          const scss = RegExp(/\.scss$/).toString();

          if (given == less || given == sass || given == scss) {
            console.log(given);
            console.log(JSON.stringify(rule.use, null, 2));
          }
        });

        config.module.rules[config.module.rules.length - 2].use.pop();
        config.module.rules[config.module.rules.length - 2].use.push(
          AntdScssThemePlugin.themify({
            loader: "sass-loader",
            options: {
              sourceMap: dev,
            },
          })
        );

        if (!isServer) {
          config.module.rules[config.module.rules.length - 1].use.pop();

          config.module.rules[config.module.rules.length - 1].use.push({
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
              appendData: fs
                .readFileSync(path.resolve(themeVariables), "utf8")
                .replace(/\$/gi, "@")
                .toString(),
            },
          });
        }
        // }

        if (isServer) {
          const antStyles = /antd\/.*?\/style.*?/;
          const origExternals = [...config.externals];
          config.externals = [
            (context, request, callback) => {
              if (request.match(antStyles)) return callback();
              if (typeof origExternals[0] === "function") {
                origExternals[0](context, request, callback);
              } else {
                callback();
              }
            },
            ...(typeof origExternals[0] === "function" ? [] : origExternals),
          ];

          config.module.rules.unshift({
            test: antStyles,
            use: "null-loader",
          });
        }

        console.log("\n\n\nAFTER");
        console.log("isServer", isServer);
        config.module.rules.map((rule) => {
          const given = RegExp(rule.test).toString();
          const less = RegExp(/\.less$/).toString();
          const sass = RegExp(/\.sass$/).toString();
          const scss = RegExp(/\.scss$/).toString();

          if (given == less || given == sass || given == scss) {
            console.log(given);
            console.log(JSON.stringify(rule.use, null, 2));
          }
        });

        console.log("\n\n\n");
        return config;
      },
    }),
  }),
  [
    optimizedImages,
    {
      /* config for next-optimized-images */
      inlineImageLimit: -1,
      handleImages: ["png"],
    },
  ],
  withSvgr,
];

module.exports = withPlugins(plugins, nextConfig);
