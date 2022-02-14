<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="cartInfo of cartInfoList"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cartInfo.isChecked === 1"
              @change="changeOneState(cartInfo)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">语音升级款</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.cartPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="changeCartNum(cartInfo.skuId, -1, cartInfo.skuNum)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              @change="
                changeCartNum(
                  cartInfo.skuId,
                  $event.target.value - cartInfo.skuNum,
                  cartInfo.skuNum
                )
              "
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="changeCartNum(cartInfo.skuId, 1, cartInfo.skuNum)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cartInfo.cartPrice * cartInfo.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a
              href="#none"
              class="sindelet"
              @click="deleteOneGoods(cartInfo.skuId)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isAllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllGoods">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择 <span>{{ allSkuNum }}</span
          >件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopCart();
    console.log(this.cartInfoList);
  },
  methods: {
    ...mapActions([
      "getShopCart",
      "getAddCart",
      "getCheckedOneState",
      "getCheckedAllState",
      "getDeleteOneGoods",
      "getDeleteAllGoods",
    ]),
    //当点击按钮时
    checkOen(e) {
      console.log(e.target.checked);
    },
    //点击+、-时发送getAddCart的ajax
    changeCartNum(skuId, skuNum, lastNum) {
      if (skuNum + lastNum < 1) {
        skuNum = 1 - lastNum;
      }
      //发送修改商品数量请求
      this.getAddCart({ skuId, skuNum });
      //重新请求购物车列表数据
      setTimeout(() => {
        this.getShopCart();
      }, 100);
    },
    //点击单选框
    async changeOneState(cartInfo) {
      try {
        //发送单选的ajax请求
        await this.getCheckedOneState({
          skuId: cartInfo.skuId,
          isChecked: cartInfo.isChecked === 1 ? 0 : 1,
        });

        //重新请求购物车列表数据
        setTimeout(() => {
          this.getShopCart();
        }, 100);
      } catch {
        alert("选择单个商品失败");
      }
    },

    //删除单个商品
    async deleteOneGoods(skuId) {
      try {
        await this.getDeleteOneGoods(skuId);
        //重新请求购物车列表数据
        setTimeout(() => {
          this.getShopCart();
        }, 100);
      } catch {
        alert("删除单个商品失败");
      }
    },

    async deleteAllGoods() {
      try {
        await this.getDeleteAllGoods(
          this.cartInfoList.reduce((p, c) => {
            c.isChecked === 1 ? p.push(c.skuId) : p;
            return p;
          }, [])
        );
        //重新请求购物车列表数据
        setTimeout(() => {
          this.getShopCart();
        }, 100);
      } catch {
        alert("删除全部商品失败");
      }
    },
  },
  computed: {
    ...mapGetters(["cartInfoList"]),
    //监听单选按钮当全部被选中时全选按钮选中
    isAllChecked: {
      get() {
        return (
          this.cartInfoList.every((item) => {
            return item.isChecked === 1;
          }) && this.cartInfoList.length
        );
      },
      set(value) {
        //发送修改全部状态的请求
        this.getCheckedAllState({
          isChecked: value ? 1 : 0,
          skuIdList: this.cartInfoList.reduce((p, c) => {
            p.push(c.skuId);
            return p;
          }, []),
        });
        //重新请求购物车列表数据
        setTimeout(() => {
          this.getShopCart();
        }, 100);
      },
    },

    //监听选中了多少间商品
    allSkuNum() {
      return this.cartInfoList.reduce((p, c) => {
        return c.isChecked === 1 ? p + c.skuNum : p;
      }, 0);
    },

    //计算得到总价
    allPrice() {
      return this.cartInfoList.reduce((p, c) => {
        return c.isChecked === 1 ? p + c.skuNum * c.cartPrice : p;
      }, 0);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
