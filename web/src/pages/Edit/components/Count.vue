<template>
  <div class="countContainer">
    <div class="item">
      <span class="name">{{ $t('count.words') }}</span>
      <span class="value">{{ words }}</span>
    </div>
    <div class="item">
      <span class="name">{{ $t('count.nodes') }}</span>
      <span class="value">{{ num }}</span>
    </div>
  </div>
</template>

<script>
/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:10
 * @Desc: 字数及节点数量统计
 */

let countEl = document.createElement('div')
export default {
  name: 'Count',
  props: {},
  data() {
    return {
      textStr: '',
      words: 0,
      num: 0
    }
  },
  created() {
    this.$bus.$on('data_change', this.onDataChange)
  },
  beforeDestroy() {
    this.$bus.$off('data_change', this.onDataChange)
  },
  methods: {
    /**
     * @Author: 王林25
     * @Date: 2022-11-14 19:20:20
     * @Desc: 监听数据变化
     */
    onDataChange(data) {
      this.textStr = ''
      this.words = 0
      this.num = 0
      this.walk(data)
      countEl.innerHTML = this.textStr
      this.words = countEl.textContent.length
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-30 22:13:07
     * @Desc: 遍历
     */
    walk(data) {
      this.num++
      this.textStr += String(data.data.text) || ''
      if (data.children && data.children.length > 0) {
        data.children.forEach(item => {
          this.walk(item)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.countContainer {
  padding: 0 12px;
  position: fixed;
  left: 20px;
  bottom: 20px;
  background: hsla(0, 0%, 100%, 0.8);
  border-radius: 2px;
  opacity: 0.8;
  height: 22px;
  line-height: 22px;
  font-size: 12px;
  display: flex;

  .item {
    color: #555;
    margin-right: 15px;

    &:last-of-type {
      margin-right: 0;
    }

    .name {
      margin-right: 5px;
    }
  }
}
</style>
