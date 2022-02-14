import { getShopCart } from "@/api";
const actions = {
  async getShopCart(miniStore) {
    const re = await getShopCart();
    if (re.code === 200) {
      miniStore.commit("SET_SHOP_CART", re.data);
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
    return state.ShopCartData[0].cartInfoList || [];
  },
};

export default {
  actions,
  mutations,
  state,
  getters,
};
