const lessToJS = require("less-vars-to-js");
const fs = require("fs");
const path = require("path");
const process = require("process");
const withSass = require("@zeit/next-sass");

const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, "./less/antd-custom.less"), "utf8")
);

const isDev = process.env.NODE_ENV === "development";

module.exports = withSass({
  cssLoaderOptions: {
    modules: true,
    localIdentName: isDev
      ? "[path][name]__[local]___[hash:base64:6]"
      : "_[hash:base64:6]",
  },
  webpack(config, options) {
    const { rules } = config.module;
    const { use } = rules[rules.length - 1];
    const loaders = options.isServer
      ? ["css-loader"]
      : use.slice(0, isDev ? 2 : 1).concat(["css-loader"]);

    config.module.rules.push({
      test: /.*\.(css|less)$/,
      use: [
        ...loaders,
        {
          loader: "less-loader",
          options: {
            javascriptEnabled: true,
            modifyVars: themeVariables,
            sourceMap: isDev,
          },
        },
      ],
    });

    if (options.isServer) {
      const externalsFunc = config.externals[0];

      config.externals[0] = function (context, request, callback) {
        if (/(antd|rc-|css-animation|@ant-design)/.test(request)) {
          return callback();
        }

        return externalsFunc(context, request, callback);
      };
    }

    return config;
  },
});
