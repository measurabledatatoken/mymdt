module.exports = {
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/common.scss";`
      }
    }
  },
  chainWebpack: config => {
    config.plugin("define").tap(args => {
      if (args[0]) {
        args[0]["process.env"] = {
          ...args[0]["process.env"],
          API_ENDPOINT: `'${process.env.API_ENDPOINT}'`,
          API_SCHEME: `'${process.env.API_SCHEME}'`
        };
      }
      return args;
    });

    config.plugin("html").tap(args => {
      args[0].chunksSortMode = "none";
      return args;
    })
  }
};
