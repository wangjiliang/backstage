module.exports= {
  configureWebpack:{
    resolve:{
      alias: {
        "assets" : "@/assets",
        "components" : "@/components",
        "views" : "@/views"
      }
    }
  },
  chainWebpack: (config) => {
    if(process.env.NODE_ENV === 'production') {
      if(process.env.npm_config_report) {
        config.plugin('webpack-bundle-analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin).end()
      }
    }
  },
  publicPath: "./",
  outputDir: "back",
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.10.3:8088',
        ws: true,
        changeOrigin: true, 
        pathRewrite: {
          '^/api': '' 
        }
      }
    }
  }
}