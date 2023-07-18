<template>
    <el-dialog
      class="sponsorDialog"
      title="友情赞助"
      :visible.sync="dialogVisible"
      width="480px"
      @close="onClose"
    >
      <div class="sponsorBox">
        <p>开源不易，如果本软件/项目有帮助到你的话，</p>
        <p>可以考虑请作者喝杯咖啡哟~</p>
        <p>转账请备注【思维导图】，</p>
        <p>你的头像和名字将会出现在<span @click="open('github')">仓库首页</span>。</p>
        <div>
            <img src="../../../assets/img/alipay.jpg" alt="">
            <img src="../../../assets/img/wechat.jpg" alt="">
        </div>
      </div>
    </el-dialog>
  </template>
  
  <script>

  export default {
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        dialogVisible: false,
      }
    },
    watch: {
      value(val, oldVal) {
        this.dialogVisible = val
      }
    },
    methods: {
      onClose() {
        this.$emit('change', false)
      },
  
      open(type) {
        let url = ''
        switch (type) {
          case 'github':
            url = 'https://github.com/wanglin2/mind-map#%E8%AF%B7%E4%BD%9C%E8%80%85%E5%96%9D%E6%9D%AF%E5%92%96%E5%95%A1'
            break
          default:
            break
        }
        window.electronAPI.openUrl(url)
      }
    }
  }
  </script>
  
  <style lang="less" scoped>
  .sponsorDialog {
    /deep/ .el-dialog__body {
      padding: 0;
    }
  }
  
  .sponsorBox {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 30px;
  
    img {
      width: 200px;
    }
  
    h2 {
      margin-bottom: 20px;
    }
  
    p {
      margin-bottom: 10px;
  
      span {
        cursor: pointer;
        color: #409eff;
        margin-right: 10px;
  
        &:last-of-type {
          margin-right: 0;
        }
      }
    }
  }
  </style>
  