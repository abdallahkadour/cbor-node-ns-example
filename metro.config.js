module.exports = {
  resolver: {
    extraNodeModules: {
      stream: require.resolve("stream-browserify"),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
