<template>
  <el-dialog
    class="nodeDialog"
    title="导出"
    :visible.sync="dialogVisible"
    width="700px"
  >
    <div>
      <div class="nameInputBox">
        <span class="name">导出文件名称</span>
        <el-input style="width: 300px" v-model="fileName" size="mini"></el-input>
        <el-checkbox v-show="['smm', 'json'].includes(exportType)" v-model="widthConfig" style="margin-left: 12px">是否包含主题、结构等配置数据</el-checkbox>
      </div>
      <el-radio-group v-model="exportType" size="mini">
        <el-radio-button label="smm">专有文件（.smm）</el-radio-button>
        <el-radio-button label="json">json文件（.json）</el-radio-button>
        <el-radio-button label="png">图片文件（.png）</el-radio-button>
        <el-radio-button label="svg">svg文件（.svg）</el-radio-button>
        <el-radio-button label="pdf">pdf文件（.pdf）</el-radio-button>
      </el-radio-group>
      <div class="tip">tips：.smm和.json文件可用于导入</div>
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
      exportType: "smm",
      fileName: '思维导图',
      widthConfig: true
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
      this.$bus.$emit("export", this.exportType, true, this.fileName, this.widthConfig);
      this.$notify.info({
          title: '消息',
          message: '如果没有触发下载，请检查是否被浏览器拦截了'
        });
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

  .tip {
    margin-top: 10px;
  }
}
</style>