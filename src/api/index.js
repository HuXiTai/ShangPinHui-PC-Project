import myAxios from "@/utils/request";

export const getBaseCategoryList = () => {
  return myAxios.get("/product/getBaseCategoryList");
};
