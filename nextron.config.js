// eslint-disable-next-line no-undef
module.exports = {
  // specify an alternate main src directory, defaults to 'main'
  webpack: (defaultConfig) =>
    Object.assign(defaultConfig, {
      entry: {
        // electron main process
        main: "./main/main.js",
        // we can require `config.js` by using `require('electron').remote.require('./config')`
        auth: "./main/auth.js",
      },
      module: {
        rules: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
        ],
      },
    }),
};
