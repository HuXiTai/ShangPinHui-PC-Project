import Vue from "vue";
import App from "./App.vue";
import router from "@/router";
import MyNavType from "@/components/MyNavType";
import MySwiper from "@/components/MySwiper";
import MyPagination from "@/components/MyPagination";
import store from "@/store";
import "@/mock/serverMock";
import VueLazyload from "vue-lazyload";
import loading from "@/assets/images/loading.gif";

//图片懒加载工具的使用
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: "dist/error.png",
  loading,
  attempt: 1,
});

//引入表单校验
import "@/utils/veeValidate";

//获取全部的api
import * as api from "@/api";
//共享api
Vue.prototype.$api = api;

//全局加载elementUI的CSS
// import "element-ui/lib/theme-chalk/index.css";

//按需引入组件
import { MessageBox, Message, Button, Input } from "element-ui";
Vue.use(Button);
Vue.component(Input.name, Input);

//全局注册MyNavType组件，因为有多个组件会用到它
Vue.component("MyNavType", MyNavType);
Vue.component("MySwiper", MySwiper);
Vue.component("MyPagination", MyPagination);

//按需使用组件
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this;
  },
}).$mount("#app");
