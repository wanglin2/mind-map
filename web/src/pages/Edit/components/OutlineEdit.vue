<template>
  <div
    class="outlineEditContainer"
    ref="outlineEditContainer"
    v-if="isOutlineEdit"
  >
    <div class="closeBtn" @click="onClose">
      <span class="icon iconfont iconguanbi"></span>
    </div>
    <div class="outlineEdit">
      <Outline :mindMap="mindMap" ref="outline"></Outline>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Outline from './Outline.vue'

// 大纲侧边栏
export default {
  name: 'OutlineEdit',
  components: {
    Outline
  },
  props: {
    mindMap: {
      type: Object
    }
  },
  computed: {
    ...mapState(['isOutlineEdit'])
  },
  watch: {
    isOutlineEdit(val) {
        if (val) {
            this.$nextTick(() => {
                this.$refs.outline.refresh()
                document.body.appendChild(this.$refs.outlineEditContainer)
            })
        }
    }
  },
  methods: {
    ...mapMutations(['setIsOutlineEdit']),

    onClose() {
      this.setIsOutlineEdit(false)
    }
  }
}
</script>

<style lang="less" scoped>
.outlineEditContainer {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  background-color: #fff;
  overflow-y: auto;
  padding: 50px 0;

  .closeBtn {
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;

    .icon {
      font-size: 28px;
    }
  }

  .outlineEdit {
    width: 1000px;
    height: max-content;
    overflow: hidden;

    /deep/ .customNode {
      .nodeEdit {
        max-width: 800px;
      }
    }
  }
}
</style>
