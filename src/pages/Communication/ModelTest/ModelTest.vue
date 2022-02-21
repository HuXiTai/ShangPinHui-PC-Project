<template>
  <div>
    <h2>深入v-model</h2>

    <input type="text" :value="msg" @input="msg = $event.target.value" />
    <span>{{ msg }}</span>
    <br />
    <CustomInput :value="msg" @input="cba" />
  </div>
</template>

<script type="text/ecmascript-6">
import CustomInput from './CustomInput.vue'
export default {
  name: 'ModelTest',
  data() {
    return {
      msg:"huxitai"
    }
  },
  methods:{
    cba($event){
      console.log($event);
      this.msg = $event
    }
  },
  components: {
    CustomInput
  }
}
</script>
