module.exports = {
  plugins: {
    autoprefixer: {
      // fix warning https://github.com/postcss/autoprefixer/releases/tag/9.6.0
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not ie <= 8',
        'iOS >= 9',
        'Android >= 4.1',
      ],
    },
  },
};
