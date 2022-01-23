<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div
        @mouseenter="isShow = true"
        @mouseleave="isShow = false || $route.path === '/home'"
      >
        <h2 class="all">全部商品分类</h2>
        <!-- 用事件委托去写点击跳转 -->
        <transition name="sort">
          <div class="sort" @click="toSearch" v-show="isShow">
            <div class="all-sort-list2">
              <!-- 不使用hover实现移入移出效果 -->
              <div
                class="item"
                v-for="(one, index) of baseCategoryList"
                :key="one.categoryId"
                :class="{ item_on: enterIndex === index }"
                @mouseenter="enterIndexFn(index)"
                @mouseleave="enterIndex = -1"
              >
                <h3>
                  <!-- <a href="">{{ one.categoryName }}</a> -->

                  <!-- 声明式路由导航-一级导航栏 -->
                  <!-- <router-link
                :to="{
                  name: 'search',
                  query: {
                    categoryName: one.categoryName,
                    category1Id: one.categoryId,
                  },
                }"
                >{{ one.categoryName }}</router-link
              > -->

                  <!-- 编程式路由导航-一级导航栏 -->
                  <!-- <a
                href="javascript:;"
                @click="
                  toSearch({
                    name: 'search',
                    query: {
                      categoryName: one.categoryName,
                      category1Id: one.categoryId,
                    },
                  })
                "
                >{{ one.categoryName }}</a
              > -->

                  <!-- 事件委托导航-一级导航栏 -->
                  <a
                    href="javascript:;"
                    :data-categoryName="one.categoryName"
                    :data-category1Id="one.categoryId"
                    >{{ one.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl
                      class="fore"
                      v-for="two of one.categoryChild"
                      :key="two.categoryId"
                    >
                      <dt>
                        <!-- <a href="">{{ two.categoryName }}</a> -->

                        <!-- 声明式路由导航-二级导航栏-->
                        <!-- <router-link
                      :to="{
                        name: 'search',
                        query: {
                          categoryName: two.categoryName,
                          category2Id: two.categoryId,
                        },
                      }"
                      >{{ two.categoryName }}</router-link
                    > -->

                        <!-- 编程式路由导航-二级导航栏 -->
                        <!-- <a
                      href="javascript:;"
                      @click="
                        toSearch({
                          name: 'search',
                          query: {
                            categoryName: two.categoryName,
                            category2Id: two.categoryId,
                          },
                        })
                      "
                      >{{ two.categoryName }}</a
                    > -->

                        <!-- 事件委托导航-二级导航栏 -->
                        <a
                          href="javascript:;"
                          :data-categoryName="two.categoryName"
                          :data-category2Id="two.categoryId"
                          >{{ two.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="three of two.categoryChild"
                          :key="three.categoryId"
                        >
                          <!-- <a href="">{{ three.categoryName }}</a> -->

                          <!-- 声明式路由导航-三级导航栏 -->
                          <!-- <router-link
                        :to="{
                          name: 'search',
                          query: {
                            categoryName: three.categoryName,
                            category3Id: three.categoryId,
                          },
                        }"
                        >{{ three.categoryName }}</router-link
                      > -->

                          <!-- 编程式路由导航-三级导航栏 -->
                          <!-- <a
                        href="javascript:;"
                        @click="
                          toSearch({
                            name: 'search',
                            query: {
                              categoryName: three.categoryName,
                              category3Id: three.categoryId,
                            },
                          })
                        "
                        >{{ three.categoryName }}</a
                      > -->

                          <!-- 事件委托导航-三级导航栏 -->
                          <a
                            href="javascript:;"
                            :data-categoryName="three.categoryName"
                            :data-category3Id="three.categoryId"
                            >{{ three.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapActions, mapState } from "vuex";
export default {
  name: "MyNavType",
  data() {
    return {
      enterIndex: -1,
      isShow: true,
    };
  },
  watch: {
    $route() {
      this.isShow = false;
    },
  },
  mounted() {
    //判断当前路径是否为search，如果是则隐藏导航栏
    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
  methods: {
    enterIndexFn: _.throttle(
      function (index) {
        this.enterIndex = index;
      },
      30,
      { trailing: true }
    ),
    //编程式路由导航跳转
    // toSearch(location) {
    //   this.$router.push(location);
    // },
    toSearch(e) {
      const { target } = e;
      const { categoryname, category1id, category2id, category3id } =
        target.dataset;

      const location = {
        name: "search",
        query: {
          categoryName: categoryname,
        },
        params: this.$route.params,
      };

      if (category1id) {
        location.query.category1Id = category1id;
      } else if (category2id) {
        location.query.category2Id = category2id;
      } else {
        location.query.category3Id = category3id;
      }

      if (categoryname) {
        this.$router.push(location);
      }
    },
  },
  computed: {
    //用计算属性baseCategoryList拿到基本类别列表
    ...mapState({
      baseCategoryList: (state) => {
        const { baseCategoryList } = state.home;
        baseCategoryList.length = 16;
        return baseCategoryList;
      },
    }),
  },
};
</script>

<style lang="less" scoped>
@keyframes sort {
  form {
    opacity: 1;
    height: 461px;
  }
  to {
    opacity: 0;
    height: 0;
  }
}

.sort-enter-active {
  animation: sort 0.3s linear reverse;
}
.sort-leave-active {
  animation: sort 0.3s linear;
}
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: #ddd;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
