module.exports = {
  //配置关闭eslint配置
  lintOnSave: false,

  //配置proxy代理跨域
  devServer: {
    //方法一：简单配置：
    // proxy: "http://39.98.123.211", //服务器地址

    //方法二：复杂配置
    proxy: {
      "/api1": {
        target: "http://39.98.123.211",
        changeOrigin: true,
        pathRewrite: {
          "^/api1": "",
        },
      },
    },
  },
};
