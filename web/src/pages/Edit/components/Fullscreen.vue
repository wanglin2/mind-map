<template>
  <div class="fullscreenContainer">
    <el-tooltip class="item" effect="dark" content="全屏" placement="top">
      <div class="btn iconfont iconquanping" @click="toFullscreen"></div>
    </el-tooltip>
  </div>
</template>

<script>
import { fullscrrenEvent, fullScreen } from '@/utils'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:10
 * @Desc: 全屏
 */
export default {
  name: 'Fullscreen',
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {}
  },
  created() {
    document[fullscrrenEvent] = () => {
      setTimeout(() => {
        this.mindMap.resize()
      }, 1000)
    }
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-07-11 21:14:30
     * @Desc: 准备全屏
     */
    toFullscreen() {
      fullScreen(this.mindMap.el)
    }
  }
}
</script>

<style lang="less" scoped>
.fullscreenContainer {
  display: flex;
  align-items: center;

  .btn {
    cursor: pointer;
  }
}
</style>
