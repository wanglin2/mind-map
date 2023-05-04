<template>
  <div class="workbencheFileListContainer">
    <div class="title">最近</div>
    <div class="fileListBox">
      <Empty v-if="list.length <= 0"></Empty>
      <el-table v-else :data="list" style="width: 100%">
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="url" label="文件路径"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" circle size="mini"></el-button>
            <el-button
              icon="el-icon-document-copy"
              circle
              size="mini"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              size="mini"
              @click="deleteFile(scope.row.url, scope.$index)"
            ></el-button>
            <el-button
              icon="el-icon-folder-opened"
              circle
              size="mini"
              @click="openFileInDir(scope.row.url)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Empty from '../components/Empty.vue'

export default {
  components: {
    Empty
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getRecentFileList()
    window.electronAPI.onRefreshRecentFileList((_event, value) => {
      console.log(1);
      this.getRecentFileList()
    })
  },
  methods: {
    async getRecentFileList() {
      this.list = await window.electronAPI.getRecentFileList()
      console.log(this.list)
    },

    openFileInDir(file) {
      window.electronAPI.openFileInDir(file)
    },

    async deleteFile(file, index) {
      let res = await window.electronAPI.deleteFile(file)
      console.log(res)
      if (res) {
      } else {
        this.list.splice(index, 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.workbencheFileListContainer {
  flex-grow: 1;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;

  .title {
    font-weight: bold;
    font-size: 18px;
    border-bottom: 1px solid #e4e7ed;
    height: 65px;
    line-height: 65px;
    flex-shrink: 0;
  }

  .fileListBox {
    flex-grow: 1;
    overflow: hidden;
  }
}
</style>
