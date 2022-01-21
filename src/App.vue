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
export default {
  name: "App",
  components: {
    MyHeader,
    MyFooter,
  },
};
</script>

<style></style>
