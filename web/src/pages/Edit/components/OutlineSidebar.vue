<template>
  <Sidebar ref="sidebar" :title="$t('outline.title')">
    <div
      class="changeBtn"
      :class="{ isDark: isDark }"
      @click="onChangeToOutlineEdit"
    >
      <span class="icon iconfont iconquanping1"></span>
    </div>
    <Outline
      :mindMap="mindMap"
      v-if="activeSidebar === 'outline'"
      @scrollTo="onScrollTo"
    ></Outline>
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
    ...mapState(['activeSidebar', 'isOutlineEdit', 'isDark'])
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
    ...mapMutations(['setIsOutlineEdit', 'setActiveSidebar']),

    onChangeToOutlineEdit() {
      this.setActiveSidebar('')
      this.setIsOutlineEdit(true)
    },

    onScrollTo(y) {
      let container = this.$refs.sidebar.getEl()
      let height = container.offsetHeight
      let top = container.scrollTop
      if (y > top + height) {
        container.scrollTo(0, y - height / 2)
      }
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

  &.isDark {
    color: #fff;
  }
}
</style>
