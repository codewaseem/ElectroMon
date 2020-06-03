// eslint-disable-next-line no-undef
module.exports = {
  // specify an alternate main src directory, defaults to 'main'
  webpack: (defaultConfig) => {
    return Object.assign(defaultConfig, {
      entry: {
        // electron main process
        main: "./main/main.js",
        // we can require `config.js` by using `require('electron').remote.require('./config')`
      },
      module: {
        rules: [
          { test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader" },
        ],
      },
    });
  },
};
