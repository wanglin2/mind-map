<template>
  <Sidebar ref="sidebar" :title="$t('outline.title')">
    <div class="changeBtn" @click="onChangeToOutlineEdit">
      <span class="icon iconfont iconquanping1"></span>
    </div>
    <Outline :mindMap="mindMap"></Outline>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar'
import { mapState, mapMutations } from 'vuex'
import Outline from './Outline.vue'

// 大纲侧边栏
export default {
  name: 'OutlineSidebar',
  components: {
    Sidebar,
    Outline
  },
  props: {
    mindMap: {
      type: Object
    }
  },
  computed: {
    ...mapState(['activeSidebar', 'isOutlineEdit'])
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
  methods: {
    ...mapMutations(['setIsOutlineEdit']),

    onChangeToOutlineEdit() {
      this.setIsOutlineEdit(true)
    }
  }
}
</script>

<style lang="less" scoped>
.changeBtn {
  position: absolute;
  right: 50px;
  top: 12px;
  cursor: pointer;
}
</style>
