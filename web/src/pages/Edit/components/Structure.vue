<template>
  <Sidebar ref="sidebar" title="结构"> </Sidebar>
</template>

<script>
import Sidebar from "./Sidebar";

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:54:14
 * @Desc: 结构
 */
export default {
  name: "Structure",
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
  created() {
    this.$bus.$on("showStructure", () => {
      this.$refs.sidebar.show = false;
      this.$nextTick(() => {
        this.$refs.sidebar.show = true;
      });
    });
  },
};
</script>

<style lang="less" scoped>
</style>
