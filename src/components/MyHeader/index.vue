<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="$store.state.user.userInfo">
            <span>用户:</span>
            <!-- 一级声明式路由导航区 -->
            <router-link to="/center">{{
              $store.state.user.userInfo.name
            }}</router-link>
            <a to="/register" class="register" @click="logout">退出登录</a>
          </p>
          <p v-else>
            <span>请</span>
            <!-- 一级声明式路由导航区 -->
            <router-link to="/login">登录</router-link>
            <router-link to="/register" class="register">免费注册</router-link>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/cart/cartList">我的购物车</router-link>
          <router-link to="/Communication">我的尚品汇</router-link>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" title="尚品汇" to="/home">
          <img src="./img/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="searchKey"
          />
          <!-- 一级编程式路由导航区 -->
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="toSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "MyHeader",
  data() {
    return {
      searchKey: "",
    };
  },
  methods: {
    ...mapActions(["getLogout"]),
    toSearch() {
      /*
        当重复点击时会报错：Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location
        原因：因为.push返回的是promise实例则点击第二次时会调用reject当reject没有处理时会报错
        解决方法：
          一：push("路径","()=>{}","()=>{}") //第二/三个回调同resolve/reject
          二：push("路径").catch(() => {})
          三：重写push和replace-->/router/index.js-10
      */

      //在search里的路由跳转不需要历史纪录
      if (this.$route.path !== "/home") {
        return this.$router.replace({
          name: "search",
          params: {
            searchKey: this.searchKey || undefined,
          },
          query: this.$route.query,
        });
      }

      this.$router.push({
        name: "search",
        params: {
          searchKey: this.searchKey || undefined,
        },
        query: this.$route.query,
      });
    },
    //退出登录
    async logout() {
      try {
        await this.getLogout();
        alert("退出成功");
        this.$store.commit("SET_CLEAR_TOKEN_USER_INFO");
        this.$router.push("/");
      } catch (e) {
        alert(e.message);
      }
    },
  },
  mounted() {
    this.$bus.$on("clearSearchKey", () => {
      this.searchKey = "";
    });
  },
};
</script>

<style lang="less" scoped>
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
