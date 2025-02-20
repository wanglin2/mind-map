<template>
  <div
    class="workbencheHomeContainer"
    :class="{ isDark: isDark }"
    @drop="onDrop"
    @dragenter="onDragenter"
    @dragover="onDragover"
    @dragleave="onDragleave"
  >
    <div class="workbencheHomeHeader">
      <MacControl></MacControl>
      <div class="rightBar">
        <el-dropdown @command="handleCommand" style="margin-right: 12px;">
          <span class="settingBtn el-icon-setting"></span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="about">关于软件</el-dropdown-item>
            <el-dropdown-item command="sponsor">友情赞助</el-dropdown-item>
            <el-dropdown-item command="help">使用帮助</el-dropdown-item>
            <el-dropdown-item command="doc">开发文档</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <WinControl></WinControl>
      </div>
    </div>
    <div class="workbencheHomeContent">
      <Sidebar></Sidebar>
      <FileList></FileList>
    </div>
    <AboutDialog v-model="showAboutDialog"></AboutDialog>
    <SponsorDialog v-model="showSponsorDialog"></SponsorDialog>
    <SettingDialog v-model="showSettingDialog"></SettingDialog>
  </div>
</template>

<script>
import WinControl from '../components/WinControl.vue'
import MacControl from '../components/MacControl.vue'
import Sidebar from '../components/Sidebar.vue'
import FileList from '../components/FileList.vue'
import AboutDialog from '../components/AboutDialog.vue'
import SponsorDialog from '../components/SponsorDialog.vue'
import SettingDialog from '../components/SettingDialog.vue'
import { getLocalConfig } from '@/api'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    WinControl,
    MacControl,
    Sidebar,
    FileList,
    AboutDialog,
    SponsorDialog,
    SettingDialog
  },
  data() {
    return {
      showAboutDialog: false,
      showSponsorDialog: false,
      showSettingDialog: false
    }
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark
    })
  },
  watch: {
    isDark() {
      this.setBodyDark()
    }
  },
  created() {
    this.initLocalConfig()
    this.setBodyDark()
  },
  methods: {
    ...mapMutations(['setLocalConfig']),

    initLocalConfig() {
      let config = getLocalConfig()
      if (config) {
        this.setLocalConfig({
          ...this.$store.state.localConfig,
          ...config
        })
      }
    },

    handleCommand(command) {
      switch (command) {
        case 'about':
          this.showAboutDialog = true
          break
        case 'sponsor':
          this.showSponsorDialog = true
          break
        case 'help':
          window.electronAPI.openUrl(
            'https://wanglin2.github.io/mind-map-docs/help/help1.html'
          )
          break
        case 'doc':
          window.electronAPI.openUrl(
            'https://wanglin2.github.io/mind-map-docs/start/introduction.html'
          )
          break
        case 'setting':
          this.showSettingDialog = true
          break
        default:
          break
      }
    },

    setBodyDark() {
      this.isDark
        ? document.body.classList.add('isDark')
        : document.body.classList.remove('isDark')
    },

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
        window.electronAPI.addRecentFileList(
          dropFiles.map(file => {
            return file.path
          })
        )
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
  overflow: hidden;

  &.isDark {
    background: rgb(39, 42, 46);

    .workbencheHomeHeader {
      background-color: #262a2e;

      .rightBar {
        .settingBtn {
          color: #fff;
        }
      }
    }
  }

  .workbencheHomeHeader {
    position: relative;
    width: 100%;
    height: 40px;
    background-color: #ebeef1;
    -webkit-app-region: drag;
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .rightBar {
      -webkit-app-region: no-drag;
      position: absolute;
      right: 0px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;

      .settingBtn {
        font-size: 20px;
        cursor: pointer;
      }
    }
  }

  .workbencheHomeContent {
    width: 100%;
    height: 100%;
    padding: 20px;
    display: flex;
    overflow: hidden;
  }
}
</style>
