<template>
  <div class="spec-preview">
    <img :src="imgList[zoomIndex].imgUrl" />
    <div class="event" @mousemove="maskMove"></div>
    <div class="big">
      <img :src="imgList[zoomIndex].imgUrl" ref="bigImg" />
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
export default {
  name: "Zoom",
  props: ["skuInfo"],
  data() {
    return {
      zoomIndex: "0",
    };
  },
  mounted() {
    //绑定自定义事件，当小图发生改变时提醒大图
    this.$bus.$on("changeZoomChecked", (index) => {
      this.zoomIndex = index;
    });
  },
  computed: {
    imgList() {
      return this.skuInfo.skuImageList || [{}];
    },
  },
  methods: {
    //蒙版绑定移动事件
    maskMove(e) {
      const oMask = this.$refs.mask;
      const oBigImg = this.$refs.bigImg;

      //模板位置的计算与赋值
      const maskLocation = {
        left: e.offsetX - oMask.offsetWidth / 2,
        top: e.offsetY - oMask.offsetHeight / 2,
      };

      //模板临界值的判断
      if (maskLocation.left <= 0) {
        maskLocation.left = 0;
      } else if (maskLocation.left >= oMask.offsetWidth) {
        maskLocation.left = oMask.offsetWidth;
      }
      if (maskLocation.top <= 0) {
        maskLocation.top = 0;
      } else if (maskLocation.top >= oMask.offsetHeight) {
        maskLocation.top = oMask.offsetHeight;
      }

      //已知放大镜的比例是2
      oBigImg.style.left = -2 * maskLocation.left + "px";
      oBigImg.style.top = -2 * maskLocation.top + "px";

      oMask.style.left = maskLocation.left + "px";
      oMask.style.top = maskLocation.top + "px";
    },
  },
};
</script>

<style lang="less">
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(0, 255, 0, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>
