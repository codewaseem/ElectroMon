const AntdScssThemePlugin = require("@codewaseem/antd-scss-theme-plugin");
const fs = require("fs");
const path = require("path");
const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");
// Where your antd-custom.less file lives
const themeVariables = path.resolve(__dirname, "./theme/antd-custom.scss");

const nextConfig = {
  distDir: ".next",
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

        config.module.rules[config.module.rules.length - 2].use.pop();
        config.module.rules[config.module.rules.length - 2].use.push(
          AntdScssThemePlugin.themify({
            loader: "sass-loader",
            options: {
              sourceMap: dev,
            },
          })
        );

        config.module.rules[config.module.rules.length - 1].use.pop();

        config.module.rules[config.module.rules.length - 1].use.push(
          AntdScssThemePlugin.themify({
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
          })
        );
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
        console.log(config.module.rules[config.module.rules.length - 1]);
        return config;
      },
    }),
  }),
  withSvgr,
];

module.exports = withPlugins(plugins, nextConfig);
