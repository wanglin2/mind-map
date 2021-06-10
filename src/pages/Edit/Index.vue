<template>
  <div class="container">
    <template v-if="show">
      <Toolbar></Toolbar>
      <Edit></Edit>
    </template>
  </div>
</template>

<script>
import Toolbar from "./components/Toolbar";
import Edit from "./components/Edit";
import { mapState, mapActions } from "vuex";

export default {
  name: "Index",
  components: {
    Toolbar,
    Edit,
  },
  data() {
    return {
      show: false,
    };
  },
  async created() {
    const loading = this.$loading({
      lock: true,
      text: "正在加载，请稍后...",
    });
    await this.getUserMindMapData();
    this.show = true;
    loading.close();
  },
  methods: {
    ...mapActions(["getUserMindMapData"]),
  },
};
</script>

<style lang="less" scoped>
.container {
}
</style>
