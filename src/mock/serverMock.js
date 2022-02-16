import banner from "./banner.json";
import floor from "./floor.json";
import tradeAddress from "./tradeAddress";
import Mock from "mockjs";

//配置接口为第一个参数，响应数据为第二个参数
Mock.mock("/mock/banner", {
  code: 200,
  data: banner,
});

Mock.mock("/mock/floor", {
  code: 200,
  data: floor,
});

Mock.mock("/mock/tradeaddress", tradeAddress);
