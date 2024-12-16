// craco.config.js
module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.resolve.fallback = {
          "url": require.resolve("url/"),
          "querystring": require.resolve("querystring-es3/"),
          "zlib": require.resolve("browserify-zlib/"),
          "crypto": require.resolve("crypto-browserify/"),
          "stream": require.resolve("stream-browserify/"),
          ...webpackConfig.resolve.fallback,
        };
        return webpackConfig;
      },
    },
  };
  