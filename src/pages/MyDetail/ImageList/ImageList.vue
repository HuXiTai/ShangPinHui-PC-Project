<template>
  <div class="swiper-container" ref="imageListSwiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(item, index) of skuInfo.skuImageList"
        :key="item.id"
      >
        <img
          :src="item.imgUrl"
          :class="{ active: defaultIndex === index }"
          @click="changeCheChecked(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  props: ["skuInfo"],
  data() {
    return {
      defaultIndex: 0,
    };
  },
  methods: {
    changeCheChecked(index) {
      this.defaultIndex = index;

      //触发自定义事件，当小图发生改变时提醒大图
      this.$bus.$emit("changeZoomChecked", index);
    },
  },
  watch: {
    skuInfo: {
      immediate: true,
      handler() {
        this.$nextTick(() => {
          //为防止多个轮播图有多个配置，class需改成ref
          new Swiper(this.$refs.imageListSwiper, {
            // loop: true, // 循环模式选项
            slidesPerView: 3, //设置slider容器能够同时显示的slides数量(carousel模式)。
            slidesPerGroup: 3, // this.$bus.$emit("changeZoomChecked", index); //在carousel mode下定义slides的数量多少为一组。

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

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
