import { getBaseCategoryList } from "@/api";

/* home的store */

const actions = {
  async getBaseCategoryList(miniStore) {
    //发送ajax请求获取基本类别列表
    const re = await getBaseCategoryList();
    miniStore.commit("GET_BASE_CATEGORY_LIST", re);
  },
};
const mutations = {
  GET_BASE_CATEGORY_LIST(state, value) {
    //把基本类别列表数据写入到home的store中
    state.baseCategoryList = value.data;
    console.log(value.data);
  },
};
const state = {
  baseCategoryList: [],
};
const getters = {};

export default {
  actions,
  mutations,
  state,
  getters,
};
