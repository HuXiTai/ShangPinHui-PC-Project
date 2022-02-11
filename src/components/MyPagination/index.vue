<template>
  <div class="pagination">
    <button :disabled="pageNo === 1" @click="$emit('changePageNo', pageNo - 1)">
      上一页
    </button>
    <button v-show="startEnd.start > 1" @click="$emit('changePageNo', 1)">
      1
    </button>

    <button v-show="startEnd.start > 2">···</button>

    <button
      v-for="page of startEnd.end"
      :key="page"
      v-show="page >= startEnd.start"
      :class="{ active: page === pageNo }"
      @click="$emit('changePageNo', page)"
    >
      {{ page }}
    </button>

    <button v-show="startEnd.end < totalPages - 1">···</button>
    <button
      v-show="startEnd.end < totalPages"
      @click="$emit('changePageNo', this.totalPages)"
    >
      {{ totalPages }}
    </button>
    <button
      :disabled="pageNo === totalPages"
      @click="$emit('changePageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ totalPages }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageNo: Number, //当前页
    pageSize: Number, //每次请求的数据
    totalPages: Number, //总页数
    continueNum: Number, //连续页数
  },
  computed: {
    //计算连续页的起始页和结束页
    startEnd() {
      //默认赋值
      let start = 0;
      let end = 0;

      const { pageNo, pageSize, totalPages, continueNum } = this;

      //判断连续页的个数大于总页数
      if (continueNum > totalPages) {
        start = 0;
        end = totalPages;
      } else {
        //连续页页数小于总页数
        start = pageNo - 2; //起始就是当前页减2
        end = pageNo + 2; //结束就是当前页加2

        //start可能是0以下  所以我们要进行修正
        if (start < 1) {
          start = 1;
          end = continueNum;
        }

        //end可能大于总页数 所以我们也要修正
        if (end > totalPages) {
          start = totalPages - continueNum + 1;
          end = totalPages;
        }
      }

      //把start和end返回
      return {
        start,
        end,
      };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>
