process.env.VUE_APP_VERSION = require('./package.json').version;

module.exports = {
  transpileDependencies: ['vuetify'],

  devServer: {
    https: true,
    port: 8081,
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8090',
        ws: true,
        pathRewrite: {'/api': '/'},
        changeOrigin: true,
      },
    },
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
};
