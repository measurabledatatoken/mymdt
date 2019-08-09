module.exports = {
  runtimeCompiler: true,
  css: {
    sourceMap: true,
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

    // Use vue inspect --plugins to find corresponding plugins for each bundle
    // and amend it accordingly
    ['index', 'dapp'].forEach(page => {
      config.plugin(`html-${page}`).tap(args => {
        args[0].chunksSortMode = "none";
        return args;
      })
    })
  },
  pages: {
    index: 'src/main.js',
    dapp: 'src/dapp.js'
  }
};
