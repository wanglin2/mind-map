<template>
  <div
    class="nodeImgPlacementToolbar"
    ref="nodeImgPlacementToolbar"
    :style="style"
    @click.stop.passive
    v-show="showImgPlacementToolbar"
  >
    <div
      class="imgPlacementItem iconfont iconcontentleft"
      v-for="item in imgPlacementList"
      :key="item"
      :class="[
        {
          selected: imgPlacement === item
        },
        'icon_' + item
      ]"
      @click="updateImgPlacement(item)"
    ></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'NodeImgPlacementToolbar',
  components: {},
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      showImgPlacementToolbar: false,
      style: {
        left: 0,
        top: 0
      },
      imgPlacementList: ['top', 'bottom', 'left', 'right'],
      node: null,
      imgNode: null,
      imgPlacement: ''
    }
  },
  computed: {},
  created() {
    this.mindMap.on('node_img_click', this.show)
    this.mindMap.on('draw_click', this.close)
    this.mindMap.on('svg_mousedown', this.close)
    this.mindMap.on('node_dblclick', this.close)
    this.mindMap.on('node_active', this.onNodeActive)
    this.mindMap.on('scale', this.onScale)
  },
  mounted() {
    document.body.append(this.$refs.nodeImgPlacementToolbar)
  },
  beforeDestroy() {
    this.mindMap.off('node_img_click', this.show)
    this.mindMap.off('draw_click', this.close)
    this.mindMap.off('svg_mousedown', this.close)
    this.mindMap.off('node_dblclick', this.close)
    this.mindMap.off('node_active', this.onNodeActive)
    this.mindMap.off('scale', this.onScale)
  },
  methods: {
    show(node, imgNode) {
      this.node = node
      this.imgPlacement = node.getStyle('imgPlacement')
      this.imgNode = imgNode
      this.showImgPlacementToolbar = true
      this.$nextTick(() => {
        this.updatePos()
      })
    },

    close() {
      this.showImgPlacementToolbar = false
      this.node = null
      this.imgPlacement = ''
      this.imgNode = null
      this.style.left = 0
      this.style.top = 0
    },

    updatePos() {
      if (!this.imgNode) return
      const {
        width,
        height
      } = this.$refs.nodeImgPlacementToolbar.getBoundingClientRect()
      const { width: imgWidth, x, y } = this.imgNode.rbox()
      this.style.left = x + imgWidth / 2 - width / 2 + 'px'
      this.style.top = y - height - 5 + 'px'
    },

    onScale() {
      this.updatePos()
    },

    onNodeActive(node) {
      if (node === this.node) {
        return
      }
      this.close()
    },

    updateImgPlacement(item) {
      this.imgPlacement = item
      this.node.setStyle('imgPlacement', item)
      this.close()
    }
  }
}
</script>

<style lang="less" scoped>
.nodeImgPlacementToolbar {
  position: fixed;
  z-index: 2000;
  height: 40px;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  padding: 0 10px;

  .imgPlacementItem {
    width: 30px;
    height: 30px;
    margin: 5px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;

    &:hover {
      background-color: rgb(237, 237, 237);
    }

    &.icon_top {
      transform: rotateZ(90deg);
    }

    &.icon_bottom {
      transform: rotateZ(-90deg);
    }

    &.icon_right {
      transform: rotateZ(180deg);
    }

    &.selected {
      background-color: rgb(237, 237, 237);
    }
  }
}
</style>
