<template>
  <div class="scaleContainer">
    <el-tooltip
      class="item"
      effect="dark"
      :content="$t('scale.zoomOut')"
      placement="top"
    >
      <div class="btn el-icon-minus" @click="narrow"></div>
    </el-tooltip>
    <div class="scaleInfo">{{ scaleNum }}%</div>
    <el-tooltip
      class="item"
      effect="dark"
      :content="$t('scale.zoomIn')"
      placement="top"
    >
      <div class="btn el-icon-plus" @click="enlarge"></div>
    </el-tooltip>
  </div>
</template>

<script>
/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:10
 * @Desc: 放大缩小
 */
export default {
  name: 'Scale',
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      scaleNum: 100
    }
  },
  watch: {
    mindMap(val, oldVal) {
      if (val && !oldVal) {
        this.mindMap.on('scale', scale => {
          this.scaleNum = this.toPer(scale)
        })
        this.scaleNum = this.toPer(this.mindMap.view.scale)
      }
    }
  },
  methods: {
    /**
     * @Author: 王林25
     * @Date: 2021-11-25 14:20:16
     * @Desc: 转换成百分数
     */
    toPer(scale) {
      return (scale * 100).toFixed(0)
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-04 17:10:34
     * @Desc: 缩小
     */
    narrow() {
      this.mindMap.view.narrow()
    },

    /**
     * @Author: 王林
     * @Date: 2021-07-04 17:10:41
     * @Desc: 放大
     */
    enlarge() {
      this.mindMap.view.enlarge()
    }
  }
}
</script>

<style lang="less" scoped>
.scaleContainer {
  display: flex;
  align-items: center;

  .btn {
    cursor: pointer;
  }

  .scaleInfo {
    width: 40px;
    text-align: center;
    margin: 0 20px;
  }
}
</style>
