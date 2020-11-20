/*
  vue.config.js 修改vue脚手架的配置文件
    注意文件目录不能出错：项目根目录
  当你启动脚手架时，读取这个文件配置从而修改脚手架配置
*/
module.exports = {
  devServer: {
    // 开启代理服务器，设置目标服务器地址为 http://localhost:3000
    // 将来如果客户端发送请求到代理服务器上，代理服务器会自动将请求转发到目标服务器上
    // proxy: "http://localhost:3000"

    proxy: {
      /*
        当请求地址以 /api 开头，当前代理配置生效
        会将请求地址重写，将请求地址的/api地址替换为空，例如：
          请求地址：http://localhost:8080/api/search/users
          重写为：http://localhost:8080/search/users
        并且转发请求到 target 地址（目标服务器地址）去
          http://localhost:3000/search/users
      */
      '/api': {
        target: 'http://localhost:3000',
        // 重写请求地址
        pathRewrite: {'^/api' : ''}
      },
      // '/v2/api': {
      //   target: 'http://localhost:3001',
      //   // 重写请求地址
      //   pathRewrite: {'^/api' : ''}
      // }
    }
  }
};
