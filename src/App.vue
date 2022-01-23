<template>
  <div id="app">
    <MyHeader />
    <br />
    <!-- 一级路由导航内容区 -->
    <router-view></router-view>
    <br />
    <!-- 方法一：判断当路径为/home或/search时显示Footer -->
    <!-- <MyFooter v-if="$route.path === '/home' || $route.path === '/search'" /> -->

    <!-- 方法一：判断路由配置上的meta消息，觉得是否显示Footer -->
    <MyFooter v-if="!$route.meta.noShowFooter" />
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import MyFooter from "@/components/MyFooter";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter,
  },
  mounted() {
    //导航栏数据只用加载一次，所以放在App里发送ajax请求就行
    this.getBaseCategoryList();
  },
  methods: {
    //调用actions的getBaseCategoryList方法
    ...mapActions(["getBaseCategoryList"]),
  },
};
</script>

<style></style>
