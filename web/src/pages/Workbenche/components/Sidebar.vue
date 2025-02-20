<template>
  <div class="workbencheSidebarContainer" :class="{ isDark: isDark }">
    <div class="createBtn" @click="create">开始新建</div>
    <div class="line"></div>
    <div class="btn" @click="openLocalFile">
      <span class="icon iconfont iconwenjian1"></span>
      <span class="text">打开本地文件</span>
    </div>
    <div class="btn" @click="openLocalFolder">
      <span class="icon iconfont icondakai"></span>
      <span class="text">打开本地文件夹</span>
    </div>
    <div
      class="btn"
      :class="{ active: currentActive == 'recent' }"
      @click="changeTab('recent')"
    >
      <span class="icon iconfont iconzuijinliulan"></span>
      <span class="text">最近文件</span>
    </div>
    <div class="folderList">
      <div
        class="folderItem"
        v-for="item in dirList"
        :class="{ active: currentActive == item.dir }"
        @click="changeTab(item.dir)"
      >
        <span class="icon iconfont iconwenjianjia"></span>
        <span class="text"> {{ item.dirName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { create } from '../utils'
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      dirList: [],
      currentActive: 'recent'
    }
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark
    })
  },
  created() {
    this.$bus.$on('closeFolder', this.onCloseFolder)
    this.$bus.$on('refreshFolder', this.onRefreshFolder)
  },
  beforeDestroy() {
    this.$bus.$off('closeFolder', this.onCloseFolder)
    this.$bus.$off('refreshFolder', this.onRefreshFolder)
  },
  methods: {
    ...mapMutations(['setCurrentFolder']),

    create,

    // 打开文件
    async openLocalFile() {
      const file = await window.electronAPI.selectOpenFile()
      if (file) {
        this.changeTab('recent')
      }
    },

    // 打开文件夹
    async openLocalFolder() {
      const dir = await window.electronAPI.selectOpenFolder()
      if (dir) {
        const files = await window.electronAPI.getFilesInDir(dir, '.smm')
        this.addDirFileList({
          dir,
          files
        })
      }
    },

    // 关闭文件夹
    onCloseFolder(folder) {
      const index = this.dirList.findIndex(item => {
        return item.dir === folder
      })
      if (index !== -1) {
        const newFolder = index > 0 ? this.dirList[index - 1].dir : 'recent'
        this.dirList.splice(index, 1)
        this.changeTab(newFolder)
      }
    },

    // 添加文件夹到文件夹列表
    addDirFileList({ dir, files }, force) {
      const sep = this.IS_WIN ? '\\' : '/'
      files = files.map(name => {
        return {
          url: (dir[dir.length - 1] === sep ? dir : dir + sep) + name,
          name
        }
      })
      const exist = this.dirList.find(item => {
        return item.dir === dir
      })
      if (exist) {
        exist.files = files
      } else {
        const arr = dir.split(/[\/\\]/g)
        this.dirList.push({
          dir,
          dirName: arr[arr.length - 1],
          files
        })
      }
      this.changeTab(dir, force)
    },

    // 切换文件夹
    changeTab(tab, force) {
      if (this.currentActive === tab && !force) return
      this.currentActive = tab
      let files = []
      if (tab !== 'recent') {
        const folder = this.dirList.find(item => {
          return item.dir === tab
        })
        if (folder) {
          files = folder.files
        }
      }
      this.setCurrentFolder(tab === 'recent' ? '' : tab)
      this.$bus.$emit('changeFolder', tab, files)
    },

    // 刷新指定文件夹
    async onRefreshFolder(folder, showTip = true) {
      const files = await window.electronAPI.getFilesInDir(folder, '.smm')
      this.addDirFileList(
        {
          dir: folder,
          files
        },
        true
      )
      if (showTip) {
        this.$message.success('刷新成功')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.workbencheSidebarContainer {
  flex-shrink: 0;
  width: 200px;
  height: 100%;
  background-color: #fff;
  border-radius: 10px;
  margin-right: 20px;
  padding: 15px 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &.isDark {
    background-color: rgb(55, 59, 63);

    .line {
      background-color: hsla(0, 0%, 100%, 0.1);
    }

    .btn,
    .folderItem {
      background-color: rgb(39, 42, 46);

      color: #fff;
    }
  }

  .createBtn {
    width: 100%;
    height: 30px;
    background-color: #409eff;
    border-radius: 5px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    user-select: none;
    flex-shrink: 0;

    &:hover {
      opacity: 0.9;
    }
  }

  .line {
    width: 100%;
    height: 1px;
    background-color: #e4e7ed;
    margin: 20px 0;
    flex-shrink: 0;
  }

  .btn,
  .folderItem {
    width: 100%;
    height: 30px;
    background-color: #fff;
    border-radius: 5px;
    color: #000;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: 14px;
    user-select: none;
    padding: 0 10px;
    margin-bottom: 8px;
    flex-shrink: 0;

    &.active,
    &:hover {
      background-color: rgba(64, 158, 255, 0.3);
      color: rgba(64, 158, 255, 1);
    }

    .icon {
      margin-right: 10px;
    }
  }

  .folderList {
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
}
</style>
