import myAxios from "@/utils/request";
import mockAxios from "@/utils/requestMock"; //mockjs虚拟服务器的引入

export const getBaseCategoryList = () => {
  return myAxios.get("/product/getBaseCategoryList");
};

//mockjs虚拟服务器的轮播图请求
export const getBanner = () => {
  return mockAxios.get("/banner");
};

//mockjs虚拟服务器的阶梯请求
export const getFloor = () => {
  return mockAxios.get("/floor");
};
