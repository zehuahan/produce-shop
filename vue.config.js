const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
})
module.exports = {
  productionSourceMap: false,
  // 关闭ESLINT校验工具
  lintOnSave: false,
  // 代理跨域
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        ws:true,  // 代理websockets
        changeOrigin: true, // 是否跨域
        pathRewrite: {
          '^api': 'http://gmall-h5-api.atguigu.cn',
        },
      },
    }
  }
}
