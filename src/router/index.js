import Vue from "vue";
import VueRouter from "vue-router";

//引入各个需要路由的组件
import MyHome from "@/pages/MyHome";
import MyLogin from "@/pages/MyLogin";
import MyRegister from "@/pages/MyRegister";
import MySearch from "@/pages/MySearch";
import MyDetail from "@/pages/MyDetail";

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
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0,
    };
  },
  routes: [
    {
      //主页的路由配置
      name: "home",
      path: "/home",
      component: MyHome,
    },
    {
      //登录页的路由配置
      name: "login",
      path: "/login",
      component: MyLogin,
      meta: { noShowFooter: true }, //meta为路由时携带的一些固定消息，$route.meta.XXX获取
    },
    {
      //注册页的路由配置
      name: "register",
      path: "/register",
      component: MyRegister,
      meta: { noShowFooter: true },
    },
    {
      //搜索页的路由配置
      name: "search",
      path: "/search/:searchKey?",
      component: MySearch,
    },
    {
      //详情页的路由配置
      name: "detail",
      path: "/detail/:skuId",
      component: MyDetail,
    },
    {
      //路由重定向
      path: "/",
      redirect: "/home",
    },
  ],
});
