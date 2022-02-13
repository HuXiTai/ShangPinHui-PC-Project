import Vue from "vue";
import Vuex from "vuex";
import home from "@/modules/home";
import user from "@/modules/user";
import search from "@/modules/search";
import detail from "@/modules/detail";
import { addCart } from "@/api";

Vue.use(Vuex);

const actions = {
  getAddCart(miniStore, { skuId, skuNum }) {
    const re = addCart(skuId, skuNum);
    if (re.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("加入购物车失败"));
    }
  },
};

const mutations = {};

const state = {};

const getters = {};

export default new Vuex.Store({
  actions,
  mutations,
  state,
  getters,
  //配置子store
  modules: {
    home,
    user,
    search,
    detail,
  },
});
