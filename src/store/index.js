import Vue from "vue";
import Vuex from "vuex";
import home from "@/modules/home";
import user from "@/modules/user";
import search from "@/modules/search";
import detail from "@/modules/detail";
import shopCart from "@/modules/shopCart";
import trade from "@/modules/trade";
import { addCart } from "@/api";

Vue.use(Vuex);

const actions = {
  async getAddCart(_, { skuId, skuNum }) {
    const re = await addCart(skuId, skuNum);
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
    shopCart,
    trade,
  },
});
