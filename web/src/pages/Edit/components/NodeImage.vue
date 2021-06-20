<template>
  <el-dialog class="nodeImageDialog" title="图片" :visible.sync="dialogVisible" width="500">
		<ImgUpload ref="imgUpload"></ImgUpload>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import ImgUpload from '@/components/ImgUpload';

export default {
	name: 'NodeImage',
	components: {
		ImgUpload
	},
  data() {
    return {
      dialogVisible: false,
    };
  },
  created() {
    this.$bus.$on("node_active", (...args) => {
      let activeNodes = args[1];
      this.activeNode = activeNodes[0];
    });
    this.$bus.$on("showNodeImage", () => {
      this.dialogVisible = true;
    });
  },
  methods: {
    cancel() {},

		/** 
		 * @Author: 王林 
		 * @Date: 2021-06-06 22:28:20 
		 * @Desc:  确定
		 */
    confirm() {},
  },
};
</script>

<style lang="less" scoped>
.nodeImageDialog {

}
</style>