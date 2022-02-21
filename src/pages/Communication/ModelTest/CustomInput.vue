<template>
  <div style="background: #ccc; height: 50px">
    <h2>{{ value }}</h2>
    <input type="text" :value="value" @input="abc" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props:["value"],
  name: 'CustomInput',
  methods:{
    abc(e){
      console.log(123);
      this.$emit('input', e.target.value)
    }
  }

}
</script>
