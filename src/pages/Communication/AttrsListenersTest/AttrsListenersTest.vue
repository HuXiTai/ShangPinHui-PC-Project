<template>
  <div>
    <h2>自定义带Hover提示的按钮</h2>
    <HintButton
      type="primary"
      icon="el-icon-plus"
      size="mini"
      title="添加"
    ></HintButton>
    <HintButton
      type="danger"
      icon="el-icon-delete"
      size="mini"
      title="删除"
    ></HintButton>
    <HintButton
      type="warning"
      icon="el-icon-edit"
      size="mini"
      title="修改"
    ></HintButton>
  </div>
</template>

<script type="text/ecmascript-6">
import HintButton from './HintButton'
export default {
  name: 'AttrsListenersTest',
  components:{
    HintButton
  },
  methods: {

  },
}
</script>
