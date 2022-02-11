import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import MyNavType from "@/components/MyNavType";
import MySwiper from "@/components/MySwiper";
import store from "@/store";
import "@/mock/serverMock";

//全局注册MyNavType组件，因为有多个组件会用到它
Vue.component("MyNavType", MyNavType);
Vue.component("MySwiper", MySwiper);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
