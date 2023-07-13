<template>
  <div class="indexContainer">
    <Header></Header>
    <Block1></Block1>
    <Block2></Block2>
    <Block3></Block3>
    <Block4></Block4>
    <Block5></Block5>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Block1 from './components/Block1.vue'
import Block2 from './components/Block2.vue'
import Block3 from './components/Block3.vue'
import Block4 from './components/Block4.vue'
import Block5 from './components/Block5.vue'

export default {
  components: {
    Header,
    Block1,
    Block2,
    Block3,
    Block4,
    Block5
  },
  data() {
    return {}
  },

  created() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.indexContainer {
}
</style>
