import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import MyNavType from "@/components/MyNavType";
import store from "@/store";

//全局注册MyNavType组件，因为有多个组件会用到它
Vue.component("MyNavType", MyNavType);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
