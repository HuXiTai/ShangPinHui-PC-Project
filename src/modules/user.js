import getUserTempId from "@/utils/UserTempId";
import {
  getCode,
  userRegister,
  getLoginToken,
  getUserInfo,
  getLogout,
} from "@/api";

const actions = {
  //获取验证码的异步请求
  async getCode(_, phone) {
    const re = await getCode(phone);
    if (re.code === 200) {
      return re.data;
    } else {
      return Promise.reject(new Error(re.message));
    }
  },

  //立即注册的异步请求
  async getUserRegister(_, userInfo) {
    const re = await userRegister(userInfo);
    if (re.code === 200) {
      return re;
    } else {
      return Promise.reject(new Error(re.message));
    }
  },

  //登录获取token异步请求
  async getLoginToken(miniStore, loginInfo) {
    const re = await getLoginToken(loginInfo);
    if (re.code === 200) {
      //持久化存储token
      localStorage.setItem("token_key", re.data.token);
      miniStore.commit("SET_LOGIN_TOKEN_DATA", re.data.token);
      return re;
    } else {
      return Promise.reject(new Error(re.message));
    }
  },

  //发送获取用户消息异步请求
  async getUserInfo(miniStore) {
    const re = await getUserInfo();
    if (re.code === 200) {
      miniStore.commit("SET_USER_INFO", re.data);
      return re;
    } else {
      return Promise.reject(new Error(re.message));
    }
  },

  //退出登录异步请求
  async getLogout() {
    const re = await getLogout();
    if (re.code === 200) {
      return re;
    } else {
      return Promise.reject(new Error(re.message));
    }
  },
};

const mutations = {
  SET_LOGIN_TOKEN_DATA(state, value) {
    state.token = value;
  },

  SET_USER_INFO(state, value) {
    state.userInfo = value;
  },

  //清空本地永久token和vuex的token和vuex的userInfo
  SET_CLEAR_TOKEN_USER_INFO(state) {
    state.token = "";
    state.userInfo = "";
    localStorage.removeItem("token_key");
  },
};
const state = {
  userTempId: getUserTempId(),
  token: localStorage.getItem("token_key"),
  userInfo: "",
};
const getters = {};

export default {
  actions,
  mutations,
  state,
  getters,
};
