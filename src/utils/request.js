import axios from "axios";
import "nprogress/nprogress.css";
import Nprogress from "nprogress";
import store from "@/store";

//创建axios新实例
const myAxios = axios.create({
  baseURL: "api1/api", //公共路径为http://39.98.123.211/api
  timeout: 10000, //最大请求时间
});

//配置请求拦截器
myAxios.interceptors.request.use(
  (config) => {
    Nprogress.start(); //请求时进度条开始
    let userTempId = store.state.user.userTempId; //的到因为临时唯一标识
    config.headers.userTempId = userTempId; //把用户临时唯一标识配置在请求头中

    let token = store.state.user.token; //得到token;
    config.headers.token = token; //把用户token配置在请求头中
    return config;
  },
  (err) => {
    return Promise.reject(err); //失败时返回失败的promise值为err，交给catch处理
  }
);

myAxios.interceptors.response.use(
  (request) => {
    Nprogress.done(); //响应成功后进度条走完
    return request.data; //成功时只用返回promise值的data数据
  },
  (err) => {
    return Promise.reject(err); //失败时返回失败的promise值为err，交给catch处理
  }
);

export default myAxios;
