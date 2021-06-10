<template>
  <Sidebar ref="sidebar" title="大纲">
    <el-tree :data="data" :props="defaultProps" default-expand-all></el-tree>
  </Sidebar>
</template>

<script>
import Sidebar from "./Sidebar";

export default {
  name: "Outline",
  components: {
    Sidebar,
  },
  data() {
    return {
      data: [],
      defaultProps: {
        label(data) {
          return data.data.text;
        },
      },
    };
  },
  created() {
    this.$bus.$on("data_change", (data) => {
      this.data = [data];
    });
		this.$bus.$on('showOutline', () => {
			this.$refs.sidebar.show = true
		})
  },
};
</script>

<style lang="less" scoped>
</style>
