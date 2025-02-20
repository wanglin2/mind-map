<template>
  <div class="workbencheEditContainer" :class="{ isDark: isDark }">
    <div class="workbencheEditHeader">
      <MacControl></MacControl>
      <div class="inputBox">
        <el-input
          v-model="name"
          size="mini"
          placeholder=""
          @blur="rename"
          @keyup.enter="rename"
        >
          <template slot="append">.smm</template>
        </el-input>
        <div class="modifyDotBox">
          <div class="modifyDot" v-show="isUnSave"></div>
        </div>
      </div>
      <div class="rightBar">
        <WinControl></WinControl>
      </div>
    </div>
    <Edit></Edit>
  </div>
</template>

<script>
import Edit from '../../Edit/Index.vue'
import WinControl from '../components/WinControl.vue'
import MacControl from '../components/MacControl.vue'
import { mapState, mapMutations } from 'vuex'

export default {
  components: {
    Edit,
    MacControl,
    WinControl
  },
  data() {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState(['fileName', 'isUnSave', 'isDark'])
  },
  watch: {
    fileName(val) {
      this.name = val
      document.title = val
    },
    name(val) {
      if (!val.trim()) return
      this.setFileName(val.trim())
    }
  },
  created() {
    window.onbeforeunload = async e => {
      e.preventDefault()
      e.returnValue = ''
      // 没有未保存内容直接关闭
      if (!this.isUnSave) {
        window.electronAPI.destroy()
      } else {
        try {
          // 否则询问用户是否关闭
          await this.checkIsClose()
          window.electronAPI.destroy()
        } catch (error) {}
      }
    }
  },
  methods: {
    ...mapMutations(['setFileName']),

    // 重命名文件
    rename() {
      let id = this.$route.params.id
      window.electronAPI.rename(id, this.name.trim())
    },

    // 询问是否关闭页面
    checkIsClose() {
      return new Promise((resolve, reject) => {
        this.$confirm('有操作尚未保存，是否确认关闭？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          customClass: this.isDark ? 'darkElMessageBox' : ''
        })
          .then(async () => {
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.workbencheEditContainer {
  &.isDark {
    .workbencheEditHeader {
      background-color: #262a2e;
    }
  }

  .workbencheEditHeader {
    position: relative;
    width: 100%;
    height: 40px;
    background-color: #ebeef1;
    -webkit-app-region: drag;
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .inputBox {
      -webkit-app-region: no-drag;
      position: absolute;
      height: 100%;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      display: flex;
      align-items: center;

      .modifyDotBox {
        width: 10px;
        height: 10px;
        margin-left: 10px;
        flex-shrink: 0;

        .modifyDot {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #409eff;
        }
      }
    }

    .rightBar {
      -webkit-app-region: no-drag;
      position: absolute;
      right: 0px;
      top: 0;
      height: 100%;
      display: flex;
      align-items: center;
    }
  }
}
</style>
