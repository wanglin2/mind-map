<template>
  <div class="scaleContainer" :class="{ isDark: isDark }">
    <el-tooltip
      class="item"
      effect="dark"
      :content="$t('scale.zoomOut')"
      placement="top"
    >
      <div class="btn el-icon-minus" @click="narrow"></div>
    </el-tooltip>
    <div class="scaleInfo">
      <input
        ref="inputRef"
        type="text"
        v-model="scaleNum"
        @input="onScaleNumInput"
        @change="onScaleNumChange"
        @focus="onScaleNumInputFocus"
        @keydown.stop
        @keyup.stop
      />%
    </div>
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
// 放大缩小
export default {
  props: {
    mindMap: {
      type: Object
    },
    isDark: {
      type: Boolean
    }
  },
  data() {
    return {
      scaleNum: 100,
      cacheScaleNum: 0
    }
  },
  watch: {
    mindMap(val, oldVal) {
      if (val && !oldVal) {
        this.mindMap.on('scale', this.onScale)
        this.mindMap.on('draw_click', this.onDrawClick)
        this.scaleNum = this.toPer(this.mindMap.view.scale)
      }
    }
  },
  beforeDestroy() {
    this.mindMap.off('scale', this.onScale)
    this.mindMap.off('draw_click', this.onDrawClick)
  },
  methods: {
    // 转换成百分数
    toPer(scale) {
      return (scale * 100).toFixed(0)
    },

    // 缩小
    narrow() {
      this.mindMap.view.narrow()
    },

    // 放大
    enlarge() {
      this.mindMap.view.enlarge()
    },

    // 聚焦时缓存当前缩放倍数
    onScaleNumInputFocus() {
      this.cacheScaleNum = this.scaleNum
    },

    // 禁止输入非数字
    onScaleNumInput() {
      this.scaleNum = this.scaleNum.replace(/[^0-9]+/g, '')
    },

    // 手动输入缩放倍数
    onScaleNumChange() {
      const scaleNum = Number(this.scaleNum)
      if (Number.isNaN(scaleNum) || scaleNum <= 0) {
        this.scaleNum = this.cacheScaleNum
      } else {
        const cx = this.mindMap.width / 2
        const cy = this.mindMap.height / 2
        this.mindMap.view.setScale(this.scaleNum / 100, cx, cy)
      }
    },

    onScale(scale) {
      this.scaleNum = this.toPer(scale)
    },

    onDrawClick() {
      if (this.$refs.inputRef) this.$refs.inputRef.blur()
    }
  }
}
</script>

<style lang="less" scoped>
.scaleContainer {
  display: flex;
  align-items: center;

  &.isDark {
    .btn {
      color: hsla(0, 0%, 100%, 0.6);
    }

    .scaleInfo {
      color: hsla(0, 0%, 100%, 0.6);

      input {
        color: hsla(0, 0%, 100%, 0.6);
      }
    }
  }

  .btn {
    cursor: pointer;
  }

  .scaleInfo {
    margin: 0 20px;
    display: flex;
    align-items: center;

    input {
      width: 35px;
      text-align: center;
      background-color: transparent;
      border: none;
      outline: none;
    }
  }
}
</style>
