module.exports = {
  lintOnSave: false,
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
          API_Scheme: `'${process.env.API_Scheme}'`
        };
      }
      return args;
    });
  }
};
