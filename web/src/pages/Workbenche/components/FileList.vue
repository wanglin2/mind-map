<template>
  <div class="workbencheFileListContainer" :class="{ isDark: isDark }">
    <div class="header">
      <div class="headerLeft">
        <span class="title">{{ currentFolderName }}</span>
      </div>
      <div class="headerRight">
        <span
          class="textBtn"
          @click="deleteMultiFile"
          v-if="multipleSelection.length > 0"
          >删除文件</span
        >
        <template v-if="this.isRecent">
          <span
            class="textBtn"
            @click="deleteMultiRecord"
            v-if="multipleSelection.length > 0"
            >删除记录</span
          >
          <span class="textBtn" @click="clearRecent">清空记录</span>
        </template>
        <template v-if="!this.isRecent">
          <span
            class="textBtn"
            @click="deleteMultiFromList"
            v-if="multipleSelection.length > 0"
            >从列表删除</span
          >
          <span class="textBtn" @click="closeList">关闭文件夹</span>
          <span class="textBtn" @click="refreshList(true)">刷新</span>
        </template>
      </div>
    </div>
    <div class="fileListBox">
      <Empty v-if="list.length <= 0"></Empty>
      <el-table
        v-else
        :data="list"
        style="width: 100%"
        height="100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <span
              class="textBtn"
              @click="openFile(scope.row.url, scope.$index)"
              >{{ scope.row.name }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="url" label="文件路径"> </el-table-column>
        <el-table-column label="操作" width="170">
          <template slot-scope="scope">
            <el-tooltip effect="dark" content="编辑" placement="top">
              <el-button
                icon="el-icon-edit"
                circle
                size="mini"
                @click="openFile(scope.row.url, scope.$index)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="复制" placement="top">
              <el-button
                icon="el-icon-document-copy"
                circle
                size="mini"
                @click="copyFile(scope.row.url, scope.$index)"
              ></el-button>
            </el-tooltip>
            <el-tooltip effect="dark" content="删除" placement="top">
              <el-button
                type="danger"
                icon="el-icon-delete"
                circle
                size="mini"
                @click="deleteFile(scope.row.url, scope.$index)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              effect="dark"
              content="打开文件所在目录"
              placement="top"
            >
              <el-button
                icon="el-icon-folder-opened"
                circle
                size="mini"
                @click="openFileInDir(scope.row.url, scope.$index)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import Empty from '../components/Empty.vue'
import { getFileName } from '@/utils'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    Empty
  },
  data() {
    return {
      currentFolder: 'recent',
      currentFolderName: '最近',
      list: [],
      recentList: [],
      multipleSelection: []
    }
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark
    }),

    isRecent() {
      return this.currentFolder === 'recent'
    }
  },
  created() {
    this.getRecentFileList()
    window.electronAPI.onRefreshRecentFileList(() => {
      this.getRecentFileList()
    })
    this.$bus.$on('changeFolder', this.onChangeFolder)
  },
  beforeDestroy() {
    this.$bus.$off('changeFolder', this.onChangeFolder)
  },
  methods: {
    // 切换文件夹
    onChangeFolder(folder, files) {
      this.multipleSelection = []
      this.currentFolder = folder
      if (folder === 'recent') {
        this.currentFolderName = '最近'
        this.list = this.recentList
      } else {
        const arr = folder.split(/[\/\\]/g)
        this.currentFolderName = arr[arr.length - 1]
        this.list = files
      }
    },

    // 表格多选
    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    // 获取最近文件列表
    async getRecentFileList() {
      this.multipleSelection = []
      let list = await window.electronAPI.getRecentFileList()
      this.recentList = list.reverse()
      if (this.isRecent) {
        this.list = this.recentList
      }
    },

    // 如果文件不存在则从列表删除，否则执行回调函数
    async checkExist(file, index, cb = () => {}) {
      try {
        await window.electronAPI.checkFileExist(file)
        cb()
      } catch (error) {
        console.log(error)
        this.list.splice(index, 1)
        window.electronAPI.removeFileInRecent(file)
        this.$message.error('文件不存在')
      }
    },

    // 在文件夹里打开文件
    openFileInDir(file, index) {
      this.checkExist(file, index, () => {
        window.electronAPI.openFileInDir(file)
      })
    },

    // 删除文件
    deleteFile(file, index) {
      this.$confirm('确定删除该文件？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: this.isDark ? 'darkElMessageBox' : ''
      })
        .then(() => {
          this.checkExist(file, index, async () => {
            try {
              const error = await window.electronAPI.deleteFile(file)
              if (error) {
                this.$message.error(error || '删除失败')
              } else {
                this.list.splice(index, 1)
                this.$message.success('删除成功')
              }
            } catch (error) {
              this.$message.error(error || '删除失败')
            }
          })
        })
        .catch(() => {})
    },

    // 编辑文件
    openFile(file, index) {
      this.checkExist(file, index, async () => {
        const res = await window.electronAPI.openFile(file)
        if (res) {
          this.$message.error(res)
        }
      })
    },

    // 复制文件
    copyFile(file, index) {
      this.checkExist(file, index, async () => {
        try {
          const error = await window.electronAPI.copyFile(file)
          if (error) {
            this.$message.error(error || '复制失败')
          } else {
            this.$message.success('复制成功')
          }
        } catch (error) {
          console.log(error)
          this.$message.error('复制失败')
        }
      })
    },

    // 同时删除多个文件
    deleteMultiFile() {
      if (this.multipleSelection.length <= 0) {
        return
      }
      this.$confirm('是否确定删除所选文件？会删除源文件。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: this.isDark ? 'darkElMessageBox' : ''
      })
        .then(async () => {
          const fileList = this.multipleSelection.map(item => {
            return item.url
          })
          const failList = await window.electronAPI.deleteMultiFile(fileList)
          const succList = fileList.filter(item => {
            return !failList.includes(item)
          })
          window.electronAPI.removeMultiFileInRecent(succList)
          if (!this.isRecent) {
            this.list = this.list.filter(item => {
              return !succList.includes(item.url)
            })
          }
          if (failList.length > 0) {
            this.$message.error('部分文件删除失败')
          } else {
            this.$message.success('删除成功')
          }
        })
        .catch(() => {})
    },

    // 同时删除多个最近记录
    deleteMultiRecord() {
      if (this.multipleSelection.length <= 0) {
        return
      }
      this.$confirm('是否确定删除所选记录？不会删除源文件。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: this.isDark ? 'darkElMessageBox' : ''
      })
        .then(async () => {
          const error = await window.electronAPI.removeMultiFileInRecent(
            this.multipleSelection.map(item => {
              return item.url
            })
          )
          if (error) {
            this.$message.error(error || '删除失败')
          } else {
            this.$message.success('删除成功')
          }
        })
        .catch(error => {
          this.$message.error(error || '删除失败')
        })
    },

    // 清空最近文件列表
    clearRecent() {
      this.$confirm('确定清空最近文件？不会删除源文件。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: this.isDark ? 'darkElMessageBox' : ''
      })
        .then(async () => {
          const error = await window.electronAPI.clearRecentFileList()
          if (error) {
            this.$message.error(error || '清空失败')
          } else {
            this.list = []
            this.recentList = []
            this.$message.success('清空成功')
          }
        })
        .catch(error => {
          this.$message.error(error || '清空失败')
        })
    },

    // 从列表里删除多个文件
    deleteMultiFromList() {
      if (this.multipleSelection.length <= 0) {
        return
      }
      const urlList = this.multipleSelection.map(item => {
        return item.url
      })
      this.$confirm('是否确定从列表中删除所选文件？不会删除源文件。', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: this.isDark ? 'darkElMessageBox' : ''
      })
        .then(() => {
          this.list = this.list.filter(item => {
            return !urlList.includes(item.url)
          })
          this.$message.success('删除成功')
        })
        .catch(() => {})
    },

    // 关闭文件夹
    closeList() {
      this.$confirm('是否确定关闭该文件夹？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        customClass: this.isDark ? 'darkElMessageBox' : ''
      })
        .then(() => {
          this.$bus.$emit('closeFolder', this.currentFolder)
          this.$message.success('关闭成功')
        })
        .catch(() => {})
    },

    // 刷新
    refreshList(showTip = true) {
      this.$bus.$emit('refreshFolder', this.currentFolder, showTip)
    }
  }
}
</script>

<style lang="less" scoped>
.workbencheFileListContainer {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &.isDark {
    background-color: rgb(55, 59, 63);

    .header {
      border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);

      .headerLeft {
        .title {
          color: #fff;
        }
      }
    }

    /deep/ .el-table {
      background-color: rgb(55, 59, 63);

      .cell {
        color: hsla(0, 0%, 100%, 0.6);
      }

      th.el-table__cell.is-leaf,
      td.el-table__cell {
        border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
      }

      td.el-table__cell,
      th.el-table__cell,
      .el-table--border::after,
      .el-table--group::after,
      &::before {
        background-color: rgb(55, 59, 63);
      }
    }
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 65px;
    flex-shrink: 0;
    border-bottom: 1px solid #e4e7ed;

    .headerLeft {
      display: flex;
      align-items: flex-end;

      .title {
        font-size: 18px;
        cursor: pointer;
      }

      .tip {
        font-size: 12px;
        margin-left: 12px;
        color: #f56c6c;
      }
    }

    .headerRight {
      display: flex;
      align-items: center;

      .textBtn {
        cursor: pointer;
        font-size: 14px;
        color: #409eff;
        margin-left: 12px;
        user-select: none;
      }
    }
  }

  .fileListBox {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .textBtn {
      cursor: pointer;
      user-select: none;
    }
  }
}
</style>
