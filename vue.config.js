var path = require('path')
module.exports = {
  publicPath: '/',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
    liveReload: true,
    open: true,
    hot: true
  },
  productionSourceMap: false
}
