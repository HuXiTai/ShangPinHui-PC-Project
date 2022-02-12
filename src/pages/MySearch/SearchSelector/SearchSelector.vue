<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <ul class="logo-list" @click="trademarkSearch">
          <li
            v-for="item of trademarkList"
            :key="item.tmId"
            :data-tmId="item.tmId"
          >
            {{ item.tmName }}
          </li>
        </ul>
      </div>
      <div class="ext">
        <!-- <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);">更多</a> -->
      </div>
    </div>
    <div class="type-wrap" v-for="attr of attrsList" :key="attr.attrId">
      <div class="fl key">{{ attr.attrName }}</div>
      <div class="fl value">
        <ul class="type-list" @click="attrSertch(attr, $event)">
          <li v-for="(item, index) of attr.attrValueList" :key="index">
            <a>{{ item }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MySearchSelector",
  computed: {
    ...mapGetters(["attrsList", "trademarkList"]),
  },
  methods: {
    //用事件委托的方式触发品牌搜索事件
    trademarkSearch(e) {
      //拿到需要的数据
      const tmId = e.target.dataset.tmid;
      const tmName = e.target.innerHTML;
      //拼接数据
      const trademarParams = `${tmId}:${tmName}`;
      //触发父组件的自定义事件
      this.$emit("trademarkSearch", trademarParams);
    },
    //用事件委托的方式触发属性搜索事件
    attrSertch(attr, $event) {
      //拿到需要的数据
      const attrId = attr.attrId;
      const attrName = attr.attrName;
      const attrValue = $event.target.innerHTML;
      //拼接数据
      const attrParams = `${attrId}:${attrValue}:${attrName}`;
      //触发父组件的自定义事件
      this.$emit("attrSearch", attrParams);
    },
  },
};
</script>

<style lang="less" scoped>
.selector {
  border: 1px solid #ddd;
  margin-bottom: 5px;
  overflow: hidden;

  .logo {
    border-top: 0;
    margin: 0;
    position: relative;
    overflow: hidden;

    .key {
      padding-bottom: 87px !important;
    }
  }

  .type-wrap {
    margin: 0;
    position: relative;
    border-top: 1px solid #ddd;
    overflow: hidden;

    .key {
      width: 100px;
      background: #f1f1f1;
      line-height: 26px;
      text-align: right;
      padding: 10px 10px 0 15px;
      float: left;
    }

    .value {
      overflow: hidden;
      padding: 10px 0 0 15px;
      color: #333;
      margin-left: 120px;
      padding-right: 90px;

      .logo-list {
        li {
          float: left;
          border: 1px solid #e4e4e4;
          margin: -1px -1px 0 0;
          width: 105px;
          height: 52px;
          text-align: center;
          line-height: 52px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-weight: 700;
          color: #e1251b;
          font-style: italic;
          font-size: 14px;
          cursor: pointer;

          img {
            max-width: 100%;
            vertical-align: middle;
          }
        }
      }

      .type-list {
        li {
          float: left;
          display: block;
          margin-right: 30px;
          line-height: 26px;
          cursor: pointer;

          a {
            text-decoration: none;
            color: #666;
          }
        }
      }
    }

    .ext {
      position: absolute;
      top: 10px;
      right: 10px;

      .sui-btn {
        display: inline-block;
        padding: 2px 14px;
        box-sizing: border-box;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 18px;
        text-align: center;
        vertical-align: middle;
        cursor: pointer;
        padding: 0 10px;
        background: #fff;
        border: 1px solid #d5d5d5;
      }

      a {
        color: #666;
      }
    }
  }
}
</style>
