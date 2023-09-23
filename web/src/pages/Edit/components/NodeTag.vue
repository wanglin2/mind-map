<template>
  <el-dialog
    class="nodeTagDialog"
    :title="$t('nodeTag.title')"
    :visible.sync="dialogVisible"
    width="500"
  >
    <el-input
      v-model="tag"
      @keyup.native.enter="add"
      @keyup.native.stop
      @keydown.native.stop
      :disabled="tagArr.length >= max"
      :placeholder="$t('nodeTag.addTip')"
    >
    </el-input>
    <div class="tagList">
      <div
        class="tagItem"
        v-for="(item, index) in tagArr"
        :key="index"
        :style="{
          backgroundColor: generateColorByContent(item)
        }"
      >
        {{ item }}
        <div class="delBtn" @click="del(index)">
          <span class="iconfont iconshanchu"></span>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel">{{ $t('dialog.cancel') }}</el-button>
      <el-button type="primary" @click="confirm">{{
        $t('dialog.confirm')
      }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { generateColorByContent } from 'simple-mind-map/src/utils/index'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:54:03
 * @Desc: 节点标签内容设置
 */
export default {
  name: 'NodeTag',
  data() {
    return {
      dialogVisible: false,
      tagArr: [],
      tag: '',
      activeNodes: [],
      max: 5
    }
  },
  created() {
    this.$bus.$on('node_active', this.handleNodeActive)
    this.$bus.$on('showNodeTag', this.handleShowNodeTag)
  },
  beforeDestroy() {
    this.$bus.$off('node_active', this.handleNodeActive)
    this.$bus.$off('showNodeTag', this.handleShowNodeTag)
  },
  methods: {
    generateColorByContent,

    handleNodeActive(...args) {
      this.activeNodes = [...args[1]]
      if (this.activeNodes.length > 0) {
        let firstNode = this.activeNodes[0]
        this.tagArr = firstNode.getData('tag') || []
      } else {
        this.tagArr = []
        this.tag = ''
      }
    },

    handleShowNodeTag() {
      this.$bus.$emit('startTextEdit')
      this.dialogVisible = true
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-24 21:48:14
     * @Desc: 添加
     */
    add() {
      this.tagArr.push(this.tag)
      this.tag = ''
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-24 21:57:53
     * @Desc: 删除
     */
    del(index) {
      this.tagArr.splice(index, 1)
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-22 22:08:11
     * @Desc: 取消
     */
    cancel() {
      this.dialogVisible = false
      this.$bus.$emit('endTextEdit')
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-06 22:28:20
     * @Desc:  确定
     */
    confirm() {
      this.activeNodes.forEach(node => {
        node.setTag(this.tagArr)
      })
      this.cancel()
    }
  }
}
</script>

<style lang="less" scoped>
.nodeTagDialog {
  .tagList {
    display: flex;
    flex-wrap: wrap;
    margin-top: 5px;

    .tagItem {
      position: relative;
      padding: 3px 5px;
      margin-right: 5px;
      margin-bottom: 5px;
      color: #fff;

      .delBtn {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        visibility: hidden;
      }

      &:hover {
        .delBtn {
          visibility: visible;
        }
      }
    }
  }
}
</style>
