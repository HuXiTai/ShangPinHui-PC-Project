<template>
  <div>
    <MyNavType />
    <MyList />
    <MyRecommend />
    <MyRank />
    <MyLike />
    <MyFloor v-for="item of floor" :key="item.id" :floor="item" />
    <MyBrand />
  </div>
</template>

<script>
import MyList from "./MyList";
import MyRecommend from "./MyRecommend";
import MyRank from "./MyRank";
import MyLike from "./MyLike";
import MyFloor from "./MyFloor";
import MyBrand from "./MyBrand";
import { mapActions, mapState } from "vuex";

export default {
  name: "MyHome",
  components: {
    MyList,
    MyRecommend,
    MyRank,
    MyLike,
    MyFloor,
    MyBrand,
  },
  mounted() {
    this.getFloor(); //该组件加载时请求数据
  },
  methods: {
    ...mapActions(["getFloor"]),
  },
  computed: {
    ...mapState({
      floor: (state) => {
        return state.home.floor;
      },
    }),
  },
};
</script>

<style></style>
