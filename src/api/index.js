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

//加入购物车的数据请求
export const addCart = (skuId, skuNum) => {
  return myAxios.post("/cart/addToCart/" + skuId + "/" + skuNum);
};

//购物车数据的请求
export const getShopCart = () => {
  return myAxios.get("/cart/cartList");
};

//切换商品选中状态的请求
export const checkedOneState = (skuId, isChecked) => {
  return myAxios.get("/cart/checkCart" + "/" + skuId + "/" + isChecked);
};

//修改购物车全部修改状态
export const checkedAllState = (isChecked, skuIdList) => {
  return myAxios.post("/cart/batchCheckCart" + "/" + isChecked, skuIdList);
};

//删除购物车单个修改状态
export const deleteOneGoods = (skuId) => {
  return myAxios.delete("/cart/deleteCart" + "/" + skuId);
};

//删除购物车全部修改状态
export const deleteAllGoods = (skuIdList) => {
  return myAxios.delete("/cart/batchDeleteCart", {
    data: skuIdList,
  });
};

//获取注册验证码
export const getCode = (phone) => {
  return myAxios.get("/user/passport/sendCode/" + phone);
};

//立即注册
export const userRegister = (userInfo) => {
  return myAxios.post("/user/passport/register", userInfo);
};

//登录获取token
export const getLoginToken = (loginInfo) => {
  return myAxios.post("/user/passport/login", loginInfo);
};

//登录获取用户消息
export const getUserInfo = () => {
  return myAxios.get("/user/passport/auth/getUserInfo");
};

//退出登录
export const getLogout = () => {
  return myAxios.get("/user/passport/logout");
};
