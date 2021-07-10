<template>
  <el-dialog
    class="nodeDialog"
    title="备注"
    :visible.sync="dialogVisible"
    width="500"
  >
    <el-input
      type="textarea"
      :autosize="{ minRows: 3, maxRows: 5 }"
      placeholder="请输入内容"
      v-model="note"
    >
    </el-input>
    <div class="tip">换行请使用：Enter+Shift</div>
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
 * @Desc: 节点备注内容设置 
 */
export default {
  name: "NodeNote",
  data() {
    return {
      dialogVisible: false,
      note: "",
      activeNode: null,
    };
  },
  created() {
    this.$bus.$on("node_active", (...args) => {
      let activeNodes = args[1];
      if (activeNodes.length > 0) {
        this.activeNode = activeNodes[0];
        this.note = this.activeNode.getData("note");
      } else {
        this.note = "";
      }
    });
    this.$bus.$on("showNodeNote", () => {
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
      this.activeNode.setNote(this.note);
      this.cancel();
    },
  },
};
</script>

<style lang="less" scoped>
.nodeDialog {
  .tip {
    margin-top: 5px;
    color: #DCDFE6;
  }
}
</style>