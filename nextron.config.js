module.exports = {
  // specify an alternate main src directory, defaults to 'main'
  webpack: (defaultConfig, env) =>
    Object.assign(defaultConfig, {
      entry: {
        // electron main process
        main: "./main/main.ts",
        // we can require `config.js` by using `require('electron').remote.require('./config')`
        auth: "./main/auth.ts",
      },
      module: {
        rules: [
          // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
          { test: /\.tsx?$/, loader: "ts-loader" },
        ],
      },
    }),
};
