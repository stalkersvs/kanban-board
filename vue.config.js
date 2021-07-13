module.exports = {
  publicPath: process.env.VUE_APP_BASE_URL,

  devServer: {
    /* port: 8490,
        host: 'kalkulio.localhost',
        https: false */
  },

  css: {
    loaderOptions: {
      sass: {
        prependData: `
                
                `,
      },
    },
  },

};
