<template>
  <el-dialog
    class="nodeDialog"
    title="导出"
    :visible.sync="dialogVisible"
    width="500"
  >
    <div>
      <div class="nameInputBox">
        <span class="name">导出文件名称</span>
        <el-input style="width: 300px" v-model="fileName" size="mini"></el-input>
      </div>
      <el-radio-group v-model="exportType">
        <el-radio label="png">图片文件（PNG）</el-radio>
        <el-radio label="svg">svg文件（SVG）</el-radio>
      </el-radio-group>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:54
 * @Desc: 导出
 */
export default {
  name: "Export",
  data() {
    return {
      dialogVisible: false,
      exportType: "png",
      fileName: '思维导图'
    };
  },
  created() {
    this.$bus.$on("showExport", () => {
      this.dialogVisible = true;
    });
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-06-22 22:08:11
     * @Desc: 取消
     */
    cancel() {
      this.dialogVisible = false;
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-06 22:28:20
     * @Desc:  确定
     */
    confirm() {
      this.$bus.$emit("export", this.exportType);
      this.cancel();
    },
  },
};
</script>

<style lang="less" scoped>
.nodeDialog {
  .nameInputBox {
    margin-bottom: 20px;

    .name {
      margin-right: 10px;
    }
  }
}
</style>