import Vue from "vue";
import Vuex from "vuex";
import home from "@/modules/home";
import user from "@/modules/user";
import search from "@/modules/search";
import detail from "@/modules/detail";

Vue.use(Vuex);

const actions = {};

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
