import { getDetailData } from "@/api";

const actions = {
  async getDetailData(miniStore, skuId) {
    const re = await getDetailData(skuId);
    if (re.code === 200) {
      miniStore.commit("SET_DETAIL_DATA", re.data);
    }
  },
};
const mutations = {
  SET_DETAIL_DATA(state, value) {
    state.detailData = value;
  },
};
const state = {
  detailData: {},
};
const getters = {};

export default {
  actions,
  mutations,
  state,
  getters,
};
