module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,

  devServer: {
    port: 5002,
    https: false,
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: ``,
      },
    },
  },

};
