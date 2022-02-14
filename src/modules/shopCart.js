import {
  getShopCart,
  checkedOneState,
  checkedAllState,
  deleteOneGoods,
  deleteAllGoods,
} from "@/api";
const actions = {
  async getShopCart(miniStore) {
    const re = await getShopCart();
    if (re.code === 200) {
      miniStore.commit("SET_SHOP_CART", re.data);
    }
  },

  //请求修改单个选中状态
  async getCheckedOneState(_, { skuId, isChecked }) {
    const re = await checkedOneState(skuId, isChecked);
    if ((re.code = 200)) {
      return "ok";
    } else {
      return Promise.reject(new Error("选中单个商品失败"));
    }
  },

  //请求修改全部选中状态
  async getCheckedAllState(_, { isChecked, skuIdList }) {
    const re = await checkedAllState(isChecked, skuIdList);
    if ((re.code = 200)) {
      return "ok";
    } else {
      return Promise.reject(new Error("选中所有商品失败"));
    }
  },

  //请求删除单个商品
  async getDeleteOneGoods(_, skuId) {
    const re = await deleteOneGoods(skuId);
    if (re.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("删除单个商品失败"));
    }
  },

  //请求删除全部商品
  async getDeleteAllGoods(_, skuIdList) {
    const re = await deleteAllGoods(skuIdList);
    if (re.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("删除全部商品失败"));
    }
  },
};
const mutations = {
  SET_SHOP_CART(state, value) {
    state.ShopCartData = value;
  },
};
const state = {
  ShopCartData: [{}],
};
const getters = {
  cartInfoList(state) {
    return (state.ShopCartData[0] || {}).cartInfoList || [];
  },
};

export default {
  actions,
  mutations,
  state,
  getters,
};
