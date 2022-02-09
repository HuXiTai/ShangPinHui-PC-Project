import { getSearchList } from "@/api";

const actions = {
  async getSearchList(miniStore, value) {
    const re = await getSearchList(value);
    if (re.code === 200) {
      miniStore.commit("SET_SEARCH_LIST", re.data);
    }
  },
};
const mutations = {
  SET_SEARCH_LIST(state, value) {
    state.searchListData = value;
    console.log(state.searchListData);
  },
};
const state = {
  searchListData: {},
};
const getters = {
  goodsList(state) {
    return state.searchListData.goodsList;
  },
  attrsList(state) {
    return state.searchListData.attrsList;
  },
  trademarkList(state) {
    return state.searchListData.trademarkList;
  },
};

export default {
  actions,
  mutations,
  state,
  getters,
};
