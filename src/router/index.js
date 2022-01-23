import Vue from "vue";
import VueRouter from "vue-router";

//引入各个需要路由的组件
import MyHome from "@/pages/MyHome";
import MyLogin from "@/pages/MyLogin";
import MyRegister from "@/pages/MyRegister";
import MySearch from "@/pages/MySearch";

//重写push和repalce
const lastPush = VueRouter.prototype.push;
VueRouter.prototype.push = function (
  location,
  onComplate = () => {},
  onAbort = () => {}
) {
  //隐私丢失后，push的this指向undefined所有需要用call指向VueRouter实例
  return lastPush.call(this, location, onComplate, onAbort);
};
const lastRepalce = VueRouter.prototype.replace;
VueRouter.prototype.replace = function (
  location,
  onComplate = () => {},
  onAbort = () => {}
) {
  //隐私丢失后，push的this指向undefined所有需要用call指向VueRouter实例
  return lastRepalce.call(this, location, onComplate, onAbort);
};

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      name: "home",
      path: "/home",
      component: MyHome,
    },
    {
      name: "login",
      path: "/login",
      component: MyLogin,
      meta: { noShowFooter: true }, //meta为路由时携带的一些固定消息，$route.meta.XXX获取
    },
    {
      name: "register",
      path: "/register",
      component: MyRegister,
      meta: { noShowFooter: true },
    },
    {
      name: "search",
      path: "/search",
      component: MySearch,
    },
    {
      path: "/",
      redirect: "/home",
    },
  ],
});
