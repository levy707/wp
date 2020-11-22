module.exports = {
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/style/styles.scss";`,
      },
    },
  },
};
