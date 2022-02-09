<template>
  <div class="swiper-container" :ref="swiperDOM">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item3 of swiperData" :key="item3.id">
        <img :src="item3.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/css/swiper.min.css";
export default {
  name: "MySwiper",
  props: ["swiperDOM", "swiperData"],
  watch: {
    swiperData: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          //为防止多个轮播图有多个配置，class需改成ref
          new Swiper(this.$refs[this.swiperDOM], {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style></style>
