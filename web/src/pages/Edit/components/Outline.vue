<template>
  <Sidebar ref="sidebar" title="大纲">
    <el-tree :data="data" :props="defaultProps" default-expand-all></el-tree>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:54:14
 * @Desc: 大纲内容
 */
export default {
  name: 'Outline',
  components: {
    Sidebar
  },
  data() {
    return {
      data: [],
      defaultProps: {
        label(data) {
          return data.data.text
        }
      }
    }
  },
  created() {
    this.$bus.$on('data_change', data => {
      this.data = [data]
    })
    this.$bus.$on('showOutline', () => {
      this.$refs.sidebar.show = false
      this.$nextTick(() => {
        this.$refs.sidebar.show = true
      })
    })
  }
}
</script>

<style lang="less" scoped></style>
