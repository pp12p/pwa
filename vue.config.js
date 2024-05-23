// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })
const WorkboxPlugin = require('workbox-webpack-plugin');
module.exports = {
  plugins: [
    // Other plugins...
    
    new WorkboxPlugin.GenerateSW()
  ],
  pwa: {
      workboxPluginMode: 'GenerateSW', // 也可以定义为‘InjectManifest’模式。但是需自己写SW.js文件进行配置
      themeColor: '#f5f5f5',
      backgroundColor: '#ffffff',
      workboxOptions: {
          importWorkboxFrom: 'cdn', //从''cdn"导入workbox,也可以‘local’
          skipWaiting: true, // 安装完SW不等待直接接管网站
          clientsClaim: true,
          navigateFallback: '/index.html',
          exclude: [/\.(?:png|jpg|jpeg|webp|gif|svg)$/], //在预缓存中排除图片
          // 定义运行时缓存
          runtimeCaching: [
              {
                  urlPattern: new RegExp('^https://cdn'),
                  handler: 'NetworkFirst',
                  options: {
                      networkTimeoutSeconds: 20,
                      cacheName: 'cdn-cache',
                      cacheableResponse: {
                          statuses: [200]
                      }
                  }
              }
          ]
      }
  }
}
