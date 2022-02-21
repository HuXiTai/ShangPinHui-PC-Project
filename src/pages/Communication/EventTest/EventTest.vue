<template>
  <div>
    <!-- <h1 @click="test">EventTest组件</h1> -->
    <Event1 @click="test($evetn)" />
  </div>
</template>

<script type="text/ecmascript-6">
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'

export default {
  name: 'EventTest',
  components: {
    Event1,
    Event2,
  },
  methods: {
  test(etent){
      console.log(etent);
    }
  }
}
</script>
