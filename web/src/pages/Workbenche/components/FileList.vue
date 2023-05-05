<template>
  <div class="workbencheFileListContainer">
    <div class="title">
      <span>最近</span>
      <span class="clearBtn" @click="clear">清空</span>
    </div>
    <div class="fileListBox">
      <Empty v-if="list.length <= 0"></Empty>
      <el-table v-else :data="list" style="width: 100%">
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="url" label="文件路径"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              circle
              size="mini"
              @click="openFile(scope.row.url)"
            ></el-button>
            <el-button
              icon="el-icon-document-copy"
              circle
              size="mini"
              @click="copyFile(scope.row.url)"
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
    window.electronAPI.onRefreshRecentFileList(() => {
      this.getRecentFileList()
    })
  },
  methods: {
    // 获取最近文件列表
    async getRecentFileList() {
      let list = await window.electronAPI.getRecentFileList()
      this.list = list.reverse()
    },

    // 在文件夹里打开文件
    openFileInDir(file) {
      window.electronAPI.openFileInDir(file)
    },

    // 删除文件
    deleteFile(file, index) {
      this.$confirm('确定删除该文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let res = await window.electronAPI.deleteFile(file)
          if (res) {
            this.$message.error('删除失败')
          } else {
            this.list.splice(index, 1)
            this.$message.success('删除成功')
          }
        })
        .catch(() => {})
    },

    // 编辑文件
    openFile(file) {
      window.electronAPI.openFile(file)
    },

    // 清空最近文件列表
    clear() {
      this.$confirm('确定清空最近文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          let res = await window.electronAPI.clearRecentFileList()
          if (res) {
            this.$message.error('清空失败')
          } else {
            this.list = []
            this.$message.success('清空成功')
          }
        })
        .catch(() => {})
    },

    // 复制文件
    async copyFile(file) {
      try {
        window.electronAPI.copyFile(file)
        this.$message.success('复制成功')
      } catch (error) {
        this.$message.error('复制失败')
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
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .clearBtn {
      cursor: pointer;
      font-size: 14px;
      color: #409eff;
    }
  }

  .fileListBox {
    flex-grow: 1;
    overflow: hidden;
  }
}
</style>
