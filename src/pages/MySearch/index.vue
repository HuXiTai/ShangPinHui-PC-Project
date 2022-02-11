<template>
  <div>
    <MyNavType />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 三级分类标识 -->
            <li class="with-x" v-show="searchListParams.keyword">
              {{ searchListParams.keyword }}<i @click="deleteKeyword">×</i>
            </li>
            <!-- 搜索标识 -->
            <li class="with-x" v-show="searchListParams.categoryName">
              {{ searchListParams.categoryName
              }}<i @click="deleteCategoryName">×</i>
            </li>
            <!-- 品牌搜索标识 -->
            <li class="with-x" v-show="searchListParams.trademark">
              品牌{{ searchListParams.trademark.split(":")[1]
              }}<i @click="deleteTrademark">×</i>
            </li>
            <!-- 属性搜索标识 -->
            <li
              class="with-x"
              v-for="(prop, index) of searchListParams.props"
              :key="index"
            >
              {{ prop.split(":")[1] }}<i @click="deleteAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @trademarkSearch="trademarkSearch"
          @attrSearch="attrSearch"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li
                  :class="{
                    active: searchListParams.order.split(':')[0] === '1',
                  }"
                >
                  <a href="#" @click.prevent="changeOrder('1')"
                    >综合<i
                      v-show="searchListParams.order.split(':')[0] === '1'"
                      class="iconfont"
                      :class="{
                        'icon-xiajiantou':
                          searchListParams.order.split(':')[1] === 'desc',
                        'icon-shangjiantou':
                          searchListParams.order.split(':')[1] === 'asc',
                      }"
                    ></i
                  ></a>
                </li>
                <li
                  :class="{
                    active: searchListParams.order.split(':')[0] === '2',
                  }"
                >
                  <a href="#" @click.prevent="changeOrder('2')"
                    >价格<i
                      v-show="searchListParams.order.split(':')[0] === '2'"
                      class="iconfont"
                      :class="{
                        'icon-xiajiantou':
                          searchListParams.order.split(':')[1] === 'desc',
                        'icon-shangjiantou':
                          searchListParams.order.split(':')[1] === 'asc',
                      }"
                    ></i
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item of goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank"
                      ><img :src="item.defaultImg"
                    /></a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ item.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" v-html="item.title"></a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 给组件分别传入当前页、每次请求的数据、总页数、连续页数 -->
          <MyPagination
            :pageNo="searchListParams.pageNo"
            :pageSize="searchListParams.pageSize"
            :totalPages="totalPages"
            :continueNum="5"
            @changePageNo="changePageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "MySearch",
  data() {
    return {
      //定义发送searchList的post请求的配置参数
      searchListParams: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        trademark: "",
        props: [],

        order: "1:asc", //默认排序
        pageNo: 1, //默认请求的页码
        pageSize: 5, //每次请求的数据
      },
    };
  },
  components: {
    SearchSelector,
  },
  methods: {
    ...mapActions(["getSearchList"]),
    //删除搜索标识三级分类标识
    deleteKeyword() {
      //当点击x时，让其依赖数据为空，就会隐藏
      this.searchListParams.keyword = "";
      //然后改变其路由地址，并让其params保留
      this.$router.push({
        name: "search",
        query: this.$route.query,
      });

      //调用header里事件总线定义的事件，清除搜索框
      this.$bus.$emit("clearSearchKey");
    },
    //删除三级分类标识
    deleteCategoryName() {
      //当点击x时，让其依赖数据为空，就会隐藏
      this.searchListParams.categoryName = "";
      //然后改变其路由地址，并让其query保留
      this.$router.push({
        name: "search",
        params: this.$route.params,
      });
    },
    //删除品牌搜索标识
    deleteTrademark() {
      this.searchListParams.trademark = "";
      this.getSearchList(this.searchListParams);
    },
    //删除属性搜索标识
    deleteAttr(index) {
      //index是当前点击删除的属性标识的下标 和 props数组中的值一一对应的
      this.searchListParams.props.splice(index, 1);
      //再次发送ajax请求
      this.getSearchList(this.searchListParams);
    },
    //品牌搜索的自定义事件
    trademarkSearch(trademark) {
      //修改post配置参数trademark为id：品牌
      this.searchListParams.trademark = trademark;
      //再次发送ajax请求
      this.getSearchList(this.searchListParams);
    },
    //属性搜索的自定义事件
    attrSearch(attrParams) {
      //如果数据重复点击则return
      const attrId = attrParams.split(":")[0];
      if (
        this.searchListParams.props.some((item) => item.split(":")[0] == attrId)
      )
        return;

      //修改post配置参数props为属性ID:属性值:属性名
      this.searchListParams.props.push(attrParams);

      //再次发送ajax请求
      this.getSearchList(this.searchListParams);
    },
    //点击实现排序方式和更换排序类型
    changeOrder(orderType) {
      //点击前上一个排序类型
      const lastoderType = this.searchListParams.order.split(":")[0];
      //点击前上一个排序方法
      const lastoderOrder = this.searchListParams.order.split(":")[1];

      //判断当前用户点击的是不是默认的逻辑点，如果是，则只需要改变图标方向即可
      if (orderType === lastoderType) {
        if (lastoderOrder === "desc") {
          this.searchListParams.order = `${orderType}:asc`;
        } else {
          this.searchListParams.order = `${orderType}:desc`;
        }
      } else {
        //如果用户点击的不是默认逻辑点，则要把逻辑点改变成当前的 并且默认降序
        this.searchListParams.order = `${orderType}:desc`;
      }

      //再次发送ajax请求
      this.getSearchList(this.searchListParams);
    },
    //当当前页码改变时调用事件
    changePageNo(page) {
      this.searchListParams.pageNo = page;
      //再次发送ajax请求
      this.getSearchList(this.searchListParams);
    },
  },
  computed: {
    ...mapGetters(["goodsList"]),
    //从数据中获取总页数
    totalPages() {
      return this.$store.state.search.searchListData.totalPages;
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler() {
        //拿到搜索框的搜索数据
        const { searchKey: keyword } = this.$route.params;
        //拿到点击的搜索数据
        const { category1Id, category2Id, category3Id, categoryName } =
          this.$route.query;

        //进行覆盖
        const searchListParams = {
          ...this.searchListParams,
          keyword,
          category1Id,
          category2Id,
          category3Id,
          categoryName,
        };
        //把覆盖后的数据跟新到searchListParams
        this.searchListParams = searchListParams;

        //监听路由地址，当发生改变时发生searchList数据的ajax请求
        this.getSearchList(this.searchListParams);
      },
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            i {
              position: relative;
              top: 2px;
              padding-left: 5px;
            }
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

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
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
