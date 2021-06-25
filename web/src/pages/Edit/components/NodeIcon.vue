<template>
  <el-dialog
    class="nodeDialog"
    title="图标"
    :visible.sync="dialogVisible"
    width="500"
  >
    <div class="item" v-for="item in nodeIconList" :key="item.name">
      <div class="title">{{ item.name }}</div>
      <div class="list">
        <div
          class="icon"
          v-for="icon in item.list"
          :key="icon.name"
          v-html="icon.icon"
					@click="setIcon(item.type, icon.name)"
        ></div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { nodeIconList } from "simple-mind-map/src/svg/icons";

/** 
 * @Author: 王林 
 * @Date: 2021-06-24 22:53:33 
 * @Desc: 节点图标内容设置 
 */
export default {
  name: "NodeIcon",
  data() {
    return {
      nodeIconList,
      dialogVisible: false,
      icon: [],
      activeNode: null,
    };
  },
  created() {
    this.$bus.$on("node_active", (...args) => {
      let activeNodes = args[1];
      if (activeNodes.length > 0) {
        this.activeNode = activeNodes[0];
        this.icon = this.activeNode.getData("icon") || [];
      } else {
        this.icon = [];
      }
    });
    this.$bus.$on("showNodeIcon", () => {
      this.dialogVisible = true;
    });
  },
  methods: {
		/** 
		 * @Author: 王林 
		 * @Date: 2021-06-23 23:16:56 
		 * @Desc: 设置icon 
		 */
		setIcon(type, name) {
			let index = this.icon.findIndex((item) => {
				return item.split('_')[0] === type;
			})
			if (index !== -1) {
				this.icon.splice(index, 1, type + '_' + name)
			} else {
				this.icon.push(type + '_' + name)
			}
			this.activeNode.setData({
				icon: [...this.icon]
			})
		}
  },
};
</script>

<style lang="less" scoped>
.nodeDialog {
	/deep/ .el-dialog__body {
		padding: 0 20px;
	}

  .item {
    margin-bottom: 20px;
		font-weight: bold;

    .title {
      margin-bottom: 10px;
    }

		.list {
			display: flex;
			flex-wrap: wrap;

			.icon {
				width: 24px;
				height: 24px;
				margin-right: 10px;
				margin-bottom: 10px;
				cursor: pointer;
			}
		}
  }
}
</style>