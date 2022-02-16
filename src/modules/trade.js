import { getTradeInfo, getAddressInfo, getOrderId } from "@/api";

const actions = {
  async getTradeInfo(miniStore) {
    const re = await getTradeInfo();
    if (re.code === 200) {
      miniStore.commit("SET_TRADE_INFO", re.data);
    }
  },

  async getAddressInfo(miniStore) {
    const re = await getAddressInfo();
    if (re.code === 200) {
      miniStore.commit("SET_ADDRESS_INFO", re.data);
    }
  },

  async getOrderId(_, { tradeNo, tradeInfo }) {
    const re = await getOrderId(tradeNo, tradeInfo);
    if (re.code === 200) {
      return re.data;
    } else {
      return Promise.reject(new Error("提交失败"));
    }
  },
};
const mutations = {
  SET_TRADE_INFO(state, value) {
    state.tradeInfo = value;
  },

  SET_ADDRESS_INFO(state, value) {
    state.addressInfo = value;
  },
};
const state = {
  tradeInfo: {},
  addressInfo: [],
};
const getters = {};

export default {
  actions,
  mutations,
  state,
  getters,
};
