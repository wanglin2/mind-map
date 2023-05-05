<template>
  <div
    class="workbencheHomeContainer"
    @drop="onDrop"
    @dragenter="onDragenter"
    @dragover="onDragover"
    @dragleave="onDragleave"
  >
    <div class="workbencheHomeHeader">
      <MacControl></MacControl>
      <WinControl></WinControl>
    </div>
    <div class="workbencheHomeContent">
      <Sidebar></Sidebar>
      <FileList></FileList>
    </div>
  </div>
</template>

<script>
import WinControl from '../components/WinControl.vue'
import MacControl from '../components/MacControl.vue'
import Sidebar from '../components/Sidebar.vue'
import FileList from '../components/FileList.vue'

export default {
  components: {
    WinControl,
    MacControl,
    Sidebar,
    FileList
  },
  methods: {
    onDrop(e) {
      e.preventDefault()
      e.stopPropagation()

      let df = e.dataTransfer
      let dropFiles = []

      if (df.items !== undefined) {
        for (let i = 0; i < df.items.length; i++) {
          let item = df.items[i]
          if (item.kind === 'file' && item.webkitGetAsEntry().isFile) {
            let file = item.getAsFile()
            if (/\.smm$/.test(file.name)) {
              dropFiles.push(file)
            }
          }
        }
      }
      if (dropFiles.length === 1) {
        // 如果只有一个文件，直接打开编辑
        window.electronAPI.openFile(dropFiles[0].path)
      } else if (dropFiles.length > 1) {
        // 否则添加到最近文件列表
        window.electronAPI.addRecentFileList(dropFiles.map((file) => {
          return file.path
        }))
      }
    },

    onDragenter(e) {
      e.preventDefault()
      e.stopPropagation()
    },

    onDragover(e) {
      e.preventDefault()
      e.stopPropagation()
    },

    onDragleave(e) {
      e.preventDefault()
      e.stopPropagation()
    }
  }
}
</script>

<style lang="less" scoped>
.workbencheHomeContainer {
  background-color: #f6f8f9;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .workbencheHomeHeader {
    width: 100%;
    height: 40px;
    background-color: #ebeef1;
    -webkit-app-region: drag;
    display: flex;
    align-items: center;
    flex-shrink: 0;
  }

  .workbencheHomeContent {
    flex-grow: 1;
    padding: 20px;
    display: flex;
    overflow: hidden;
  }
}
</style>
