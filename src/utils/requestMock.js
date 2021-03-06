import axios from "axios";
import "nprogress/nprogress.css";
import Nprogress from "nprogress";

//创建axios新实例
const myAxios = axios.create({
  baseURL: "/mock", //使用mockjs模拟服务器
  timeout: 10000, //最大请求时间
});

//配置请求拦截器
myAxios.interceptors.request.use(
  (config) => {
    Nprogress.start(); //请求时进度条开始
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
