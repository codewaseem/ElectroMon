const AntdScssThemePlugin = require("@codewaseem/antd-scss-theme-plugin");
const path = require("path");
const withPlugins = require("next-compose-plugins");
const withSvgr = require("next-svgr");
const withLess = require("@zeit/next-less");
const withSass = require("@zeit/next-sass");
// Where your antd-custom.less file lives
const themeVariables = path.resolve(__dirname, "./theme/antd-custom.scss");

const nextConfig = {
  distDir: ".next",
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    // Important: return the modified config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));
    config.plugins.push(new AntdScssThemePlugin(themeVariables));

    config.module.rules.unshift({
      test: /\.less$/,
      use: [
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            sourceMap: dev,
          },
        },
        AntdScssThemePlugin.themify({
          loader: "less-loader",
          options: {
            lessOptions: {
              javascriptEnabled: true,
            },
          },
        }),
      ],
    });

    config.module.rules.unshift({
      test: /\.s[ac]ss$/i,
      use: [
        {
          loader: "css-loader",
          options: {
            importLoaders: 1,
            sourceMap: dev,
            modules: {
              mode: "local",
              exportGlobals: true,
              localIdentName: "[path][name]__[local]--[hash:base64:5]",
            },
          },
        },
        AntdScssThemePlugin.themify({
          loader: "sass-loader",
          options: {
            sourceMap: dev,
          },
        }),
      ],
    });

    return config;
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
      webpack: (config, { isServer }) => {
        //Make Ant styles work with less
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
        return config;
      },
    }),
  }),
  withSvgr,
];

module.exports = withPlugins(plugins, nextConfig);
