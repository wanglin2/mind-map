<template>
  <div class="fileUploadContainer">
    <div class="fileUploadPanel">
      <div class="upBtn" v-if="!value">
        <label
          for="fileUploadInput"
          class="fileUploadInputArea"
          @dragenter.stop.prevent
          @dragover.stop.prevent
          @drop.stop.prevent="onDrop"
          >{{ $t('attachment.uploadTip') }}</label
        >
        <input
          type="file"
          id="fileUploadInput"
          @change="onFileUploadInputChange"
        />
      </div>
      <div v-if="value" class="uploadInfoBox">
        <div class="fileInfo">
          <i class="el-icon-document"></i>
          <span class="fileName">{{ fileName }}</span>
        </div>
        <span class="delBtn el-icon-close" @click="deleteFile"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileUpload',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    fileName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      file: null
    }
  },
  methods: {
    /**
     * 文件选择事件
     */
    onFileUploadInputChange(e) {
      let file = e.target.files[0]
      this.selectFile(file)
    },

    /**
     * 拖动上传文件
     */
    onDrop(e) {
      let dt = e.dataTransfer
      let file = dt.files && dt.files[0]
      this.selectFile(file)
    },

    /**
     * 选择文件
     */
    selectFile(file) {
      if (!file) return
      this.file = file
      // 使用FormData上传文件到服务器
      const formData = new FormData()
      formData.append('file', file)
      
      // 显示上传中提示
      const loadingInstance = this.$loading({
        lock: true,
        text: this.$t('attachment.uploading'),
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      
      // 调用上传接口
      this.uploadFile(formData).then(res => {
        loadingInstance.close()
        if (res.success) {
          const fileInfo = {
            url: res.data.url,
            name: file.name || res.data.name,
            size: file.size,
            type: file.type
          }
          
          console.log('文件上传成功，即将触发 success 事件:', fileInfo)
          
          // 更新内部状态
          this.$emit('change', res.data.url, file.name || res.data.name)
          
          // 发送 success 事件，将文件信息传递给父组件
          this.$emit('success', fileInfo)
        } else {
          this.$message.error(res.message || this.$t('attachment.uploadFailed'))
        }
      }).catch(err => {
        loadingInstance.close()
        this.$message.error(this.$t('attachment.uploadFailed'))
        console.error('文件上传失败:', err)
      })
    },

    /**
     * 上传文件到服务器
     */
    uploadFile(formData) {
      return fetch('/api/file/upload', {
        method: 'POST',
        body: formData
      }).then(response => response.json())
    },

    /**
     * 删除文件
     */
    deleteFile() {
      this.$emit('change', '', '')
      this.file = null
    }
  }
}
</script>

<style lang="less" scoped>
.fileUploadContainer {
  width: 100%;
  min-height: 100px;
  padding: 10px;
  box-sizing: border-box;

  .fileUploadPanel {
    width: 100%;
    height: 100%;
    position: relative;

    .upBtn {
      width: 100%;
      height: 100px;
      border: 2px dashed #ddd;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s;

      &:hover {
        border-color: #409eff;
        color: #409eff;
      }

      .fileUploadInputArea {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }

      input[type="file"] {
        display: none;
      }
    }

    .uploadInfoBox {
      width: 100%;
      padding: 10px;
      border: 1px solid #eee;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;

      .fileInfo {
        display: flex;
        align-items: center;
        
        i {
          margin-right: 5px;
          font-size: 18px;
          color: #409eff;
        }

        .fileName {
          font-size: 14px;
          color: #333;
          max-width: 200px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .delBtn {
        cursor: pointer;
        color: #999;
        font-size: 16px;
        transition: all 0.3s;

        &:hover {
          color: #f56c6c;
        }
      }
    }
  }
}
</style> 