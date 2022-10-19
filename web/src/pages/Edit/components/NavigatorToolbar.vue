<template>
  <div class="navigatorContainer">
    <div class="item">
      <el-checkbox v-model="openMiniMap" @change="toggleMiniMap"
        >开启小地图</el-checkbox
      >
    </div>
    <div class="item">
      <el-switch
        v-model="isReadonly"
        active-text="只读模式"
        inactive-text="编辑模式"
        @change="readonlyChange"
      >
      </el-switch>
    </div>
    <div class="item">
      <Scale :mindMap="mindMap"></Scale>
    </div>
    <div class="item">
      <Fullscreen :mindMap="mindMap"></Fullscreen>
    </div>
  </div>
</template>

<script>
import Scale from './Scale'
import Fullscreen from './Fullscreen'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:10
 * @Desc: 导航器工具栏
 */
export default {
  name: 'NavigatorToolbar',
  components: {
    Scale,
    Fullscreen
  },
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      isReadonly: false,
      openMiniMap: false
    }
  },
  mounted() {
    this.toggleMiniMap(this.openMiniMap)
  },
  methods: {
    readonlyChange(value) {
      this.mindMap.setMode(value ? 'readonly' : 'edit')
    },

    toggleMiniMap(show) {
      this.$bus.$emit('toggle_mini_map', show)
    }
  }
}
</script>

<style lang="less" scoped>
.navigatorContainer {
  padding: 0 12px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: hsla(0, 0%, 100%, 0.8);
  border-radius: 5px;
  opacity: 0.8;
  height: 44px;
  font-size: 12px;
  display: flex;
  align-items: center;

  .item {
    margin-right: 20px;

    &:last-of-type {
      margin-right: 0;
    }
  }
}
</style>
