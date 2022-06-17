const webpack = require("@nativescript/webpack");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const dotenv = require("dotenv");

module.exports = (env) => {
  webpack.init(env);

  dotenv.config();
  const isUppercase = (key) => key.toUpperCase() === key;
  const envKeys = Object.keys(env);
  let dotEnvValues = envKeys.filter(isUppercase).reduce((memo, key) => {
    return { ...memo, [key]: JSON.stringify(env[key]) };
  }, {});

  const dotEnvkeys = Object.keys(process.env);
  dotEnvValues = dotEnvkeys.filter(isUppercase).reduce(
    (memo, key) => {
      if (memo[key]) {
        return memo;
      }

      return {
        ...memo,
        [key]: dotEnvValues[key] || JSON.stringify(process.env[key]),
      };
    },
    { ...dotEnvValues }
  );
  webpack.chainWebpack((config) => {
    config.plugin("polyfills").use(NodePolyfillPlugin);
  });
  webpack.mergeWebpack({
    resolve: {
      alias: {
        process: "process/browser",
      },
      fallback: {
        stream: require.resolve("stream-browserify"),
        // assert: false,
        // fs: false,
        util: require.resolve("util/"),
      },
    },
  });

  return webpack.resolveConfig();
};
