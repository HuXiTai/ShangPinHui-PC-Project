import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";

//引入各个需要路由的组件
// import MyHome from "@/pages/MyHome";
// import MyLogin from "@/pages/MyLogin";
// import MyRegister from "@/pages/MyRegister";
// import MySearch from "@/pages/MySearch";
// import MyDetail from "@/pages/MyDetail";
// import MyAddCartSuccess from "@/pages/MyAddCartSuccess";
// import MyShopCart from "@/pages/MyShopCart";
// import MyPay from "@/pages/MyPay";
// import MyPaySuccess from "@/pages/MyPaySuccess";
// import MyTrade from "@/pages/MyTrade";
// import MyCenter from "@/pages/MyCenter";
// import MyGroupOrder from "@/pages/MyCenter/MyGroupOrder";
// import MyMyOrder from "@/pages/MyCenter/MyMyOrder";
//使用路透懒加载
const MyHome = () => import("@/pages/MyHome");
const MyLogin = () => import("@/pages/MyLogin");
const MyRegister = () => import("@/pages/MyRegister");
const MySearch = () => import("@/pages/MySearch");
const MyDetail = () => import("@/pages/MyDetail");
const MyAddCartSuccess = () => import("@/pages/MyAddCartSuccess");
const MyShopCart = () => import("@/pages/MyShopCart");
const MyPay = () => import("@/pages/MyPay");
const MyPaySuccess = () => import("@/pages/MyPaySuccess");
const MyTrade = () => import("@/pages/MyTrade");
const MyCenter = () => import("@/pages/MyCenter");
const MyGroupOrder = () => import("@/pages/MyCenter/MyGroupOrder");
const MyMyOrder = () => import("@/pages/MyCenter/MyMyOrder");

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

const router = new VueRouter({
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
    //添加到购物车成功_静态
    {
      name: "success",
      path: "/success/:skuNum?",
      component: MyAddCartSuccess,
      //路由独享的守卫
      beforeEnter: (to, from, next) => {
        let { skuNum } = to.params;
        let skuInfo = sessionStorage.getItem("skuInfo_key");
        //判断是否携带需要的数据选择放行
        if (skuNum && skuInfo) {
          next();
        } else {
          next(false);
        }
      },
    },
    //购物车页面
    {
      name: "shopCart",
      path: "/cart/cartList",
      component: MyShopCart,
    },
    //支付页面
    {
      name: "pay",
      path: "/pay",
      component: MyPay,
      //路由独享的守卫
      beforeEnter: (to, from, next) => {
        //判断是否从/trade过来选择放行
        if (from.path === "/trade") {
          next();
        } else {
          next(false);
        }
      },
    },
    //支付完成页面
    {
      name: "paysuccess",
      path: "/paysuccess",
      component: MyPaySuccess,
      //路由独享的守卫
      beforeEnter: (to, from, next) => {
        //判断是否从/pay过来选择放行
        if (from.path === "/pay") {
          next();
        } else {
          next(false);
        }
      },
    },
    //订单详情页面
    {
      name: "trade",
      path: "/trade",
      component: MyTrade,
      //路由独享的守卫
      beforeEnter: (to, from, next) => {
        //判断是否从/cart/cartList过来选择放行
        if (from.path === "/cart/cartList") {
          next();
        } else {
          next(false);
        }
      },
    },

    //个人中心页面
    {
      path: "/center",
      component: MyCenter,
      children: [
        {
          name: "myorder",
          path: "myorder",
          component: MyMyOrder,
        },
        { name: "grouporder", path: "grouporder", component: MyGroupOrder },
        {
          path: "",
          redirect: "/center/myorder",
        },
      ],
    },
    {
      //路由重定向
      path: "/",
      redirect: "/home",
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token;
  const userInfo = store.state.user.userInfo;
  //判断是否有token
  if (token) {
    //如果token存在，在判断是否再次点击了登录页面
    if (to.path === "/login") {
      //如果在次点击登录则跳转到主页
      next("/");
    } else {
      //否则判断是否有用户信息
      if (userInfo) {
        //如果有用户信息则畅通无阻
        next();
      } else {
        //如果没有用户信息则请求用户消息
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (e) {
          //如果请求失败则全部被视为令牌失效，并重新登录
          alert("登录令牌失效，请重新登录");
          store.commit("SET_CLEAR_TOKEN_USER_INFO");
          next("/login");
        }
      }
    }
  } else {
    //如果没有token则暂时next，订单详情、支付、支付成功、个人中心页面等在做判断
    if (
      to.path === "/trade" ||
      to.path === "/pay" ||
      to.path.includes("/center")
    ) {
      next("/login?to=" + to.path); //把要去的地址保存在路由上
      alert("请先登录");
    } else {
      next();
    }
  }
});

export default router;
