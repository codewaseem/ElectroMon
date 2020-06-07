const path = require("path");

// eslint-disable-next-line no-undef
module.exports = {
  // specify an alternate main src directory, defaults to 'main'
  webpack: (defaultConfig) => {
    return Object.assign(defaultConfig, {
      entry: {
        // electron main process
        main: "./main/main.js",
        ui: "./main/ui.js",
        // we can require `config.js` by using `require('electron').remote.require('./config')`
      },
      resolve: {
        alias: {
          ...defaultConfig.resolve.alias,
          iconv: path.join(
            __dirname,
            "node_modules/iconv/build/Release/iconv.node"
          ),
        },
      },
      module: {
        rules: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
          {
            test: /\.node$/,
            use: "node-loader",
          },
        ],
      },
    });
  },
};
