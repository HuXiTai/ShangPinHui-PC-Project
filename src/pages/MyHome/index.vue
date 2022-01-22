<template>
  <div>
    <MyNavType />
    <MyList />
    <MyRecommend />
    <MyRank />
    <MyLike />
    <MyFloor />
    <MyFloor />
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
};
</script>

<style></style>
