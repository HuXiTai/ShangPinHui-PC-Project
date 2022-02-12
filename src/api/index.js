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

//searchList的请求
export const getSearchList = (searchListParams) => {
  return myAxios.post("/list", searchListParams);
};

//detail页面的数据请求
export const getDetailData = (skuId) => {
  return myAxios.get("/item/" + skuId);
};
