<template>
  <Sidebar ref="sidebar" :title="$t('outline.title')">
    <el-tree :data="data" :props="defaultProps" default-expand-all></el-tree>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar'
import { mapState } from 'vuex'

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
  computed: {
    ...mapState(['activeSidebar'])
  },
  watch: {
    activeSidebar(val) {
      if (val === 'outline') {
        this.$refs.sidebar.show = true
      } else {
        this.$refs.sidebar.show = false
      }
    }
  },
  created() {
    this.$bus.$on('data_change', data => {
      this.data = [data]
    })
  }
}
</script>

<style lang="less" scoped></style>
