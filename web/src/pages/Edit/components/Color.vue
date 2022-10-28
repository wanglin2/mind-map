<template>
  <div>
    <div class="colorList">
      <span
        class="colorItem"
        v-for="item in colorList"
        :style="{ backgroundColor: item }"
        :key="item"
        @click="clickColorItem(item)"
      ></span>
    </div>
    <div class="moreColor">
      <span>{{ $t('color.moreColor') }}</span>
      <el-color-picker
        size="mini"
        v-model="selectColor"
        @change="changeColor"
      ></el-color-picker>
    </div>
  </div>
</template>

<script>
import { colorList } from '@/config'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:10
 * @Desc: 颜色选择器
 */
export default {
  name: 'Color',
  props: {
    color: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      colorList,
      selectColor: ''
    }
  },
  watch: {
    color() {
      this.selectColor = this.color
    }
  },
  created() {
    this.selectColor = this.color
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-05-05 09:38:06
     * @Desc: 点击预设颜色
     */
    clickColorItem(color) {
      this.$emit('change', color)
    },

    /**
     * @Author: 王林
     * @Date: 2021-05-05 10:17:26
     * @Desc: 修改颜色
     */
    changeColor() {
      this.$emit('change', this.selectColor)
    }
  }
}
</script>

<style lang="less" scoped>
.colorList {
  width: 240px;

  .colorItem {
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}

.moreColor {
  display: flex;
  align-items: center;

  span {
    margin-right: 5px;
  }
}
</style>
