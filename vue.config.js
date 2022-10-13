//创建vue.config.js文件
module.exports = {
    lintOnSave: false,//是否在保存时检查
    devServer: {
      host: '127.0.0.1',//本机ip
      port: 8080,//本机端口
      open: true,
      proxy: {
        '/prox': {  //代理别名
          target: 'http://127.0.0.1:4040/',   //代理目标值
          //target: 'https://www.panewslab.com/',   //代理目标值
          changeOrigin: true,
          secure: true,
          pathRewrite:{  //替换路径中的/api
            '^/prox':''
          }
          /*pathRequiresRewrite: {
            '^/api': ''
          }*/
        }
      },
      overlay: {
        warning: false,
        errors: true
      }
    }
  }
