<template>
  <div class="countContainer">
    <div class="item">
      <span class="name">字数</span>
      <span class="value">{{ words }}</span>
    </div>
    <div class="item">
      <span class="name">节点</span>
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
export default {
  name: "Count",
  props: {},
  data() {
    return {
      words: 0,
      num: 0,
    };
  },
  created() {
    this.$bus.$on("data_change", (data) => {
      this.words = 0;
      this.num = 0;
      this.walk(data);
    });
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-06-30 22:13:07
     * @Desc: 遍历
     */
    walk(data) {
      this.num++;
      this.words += (String(data.data.text) || "").length;
      if (data.children && data.children.length > 0) {
        data.children.forEach((item) => {
          this.walk(item);
        });
      }
    },
  },
};
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
