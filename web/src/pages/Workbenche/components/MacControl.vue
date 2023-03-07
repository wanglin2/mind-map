<template>
  <div class="macControl" v-if="IS_MAC"></div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.macControl {
  width: 100px;
  height: 100%;
  flex-shrink: 0;
}
</style>
