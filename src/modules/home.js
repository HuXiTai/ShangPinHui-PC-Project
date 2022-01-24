import { getBaseCategoryList, getBanner, getFloor } from "@/api";

/* home的store */

const actions = {
  async getBaseCategoryList(miniStore) {
    //发送ajax请求获取基本类别列表
    const re = await getBaseCategoryList();
    if (re.code === 200) miniStore.commit("SET_BASE_CATEGORY_LIST", re);
  },
  async getBanner(miniStore) {
    //发送ajax请求轮播图数据
    const re = await getBanner();
    if (re.code === 200) miniStore.commit("SET_BANNER", re.data);
  },
  async getFloor(miniStore) {
    //发送ajax请求阶梯数据
    const re = await getFloor();
    if (re.code === 200) miniStore.commit("SET_FLOOR", re.data);
  },
};
const mutations = {
  SET_BASE_CATEGORY_LIST(state, value) {
    //把基本类别列表数据写入到home的store中
    state.baseCategoryList = value.data;
    console.log(value.data);
  },
  SET_BANNER(state, value) {
    //把轮播图数据写入到home的store中
    state.banner = value;
  },
  SET_FLOOR(state, value) {
    //把阶梯数据写入到home的store中
    state.floor = value;
  },
};
const state = {
  baseCategoryList: [],
  banner: [],
  floor: [],
};
const getters = {};

export default {
  actions,
  mutations,
  state,
  getters,
};
