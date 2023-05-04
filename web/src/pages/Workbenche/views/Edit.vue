<template>
  <div class="workbencheEditContainer">
    <div class="workbencheEditHeader">
      <MacControl></MacControl>
      <WinControl></WinControl>
      <div class="inputBox">
        <el-input v-model="name" size="mini" placeholder=""></el-input>
        <div class="modifyDotBox">
          <div class="modifyDot" v-show="isUnSave"></div>
        </div>
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
  data () {
    return {
      name: ''
    }
  },
  computed: {
    ...mapState(['fileName', 'isUnSave'])
  },  
  watch: {
    fileName(val) {
      this.name = val
    },
    name(val) {
      if (!val.trim()) return
      this.setFileName(val)
      let id = this.$route.params.id
      window.electronAPI.rename(id, val.trim())
    }
  },
  methods: {
    ...mapMutations(['setFileName'])
  }
}
</script>

<style lang="less" scoped>
.workbencheEditContainer {
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

        .modifyDot {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #409eff;
        }
      }
    }
  }
}
</style>
