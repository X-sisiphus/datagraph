module.exports = {
    devServer: {
        client: {
          overlay: false
        }
      },
    lintOnSave: false,
    productionSourceMap: false,
    'publicPath': './',
    transpileDependencies: [
        'vuetify'
    ]
}