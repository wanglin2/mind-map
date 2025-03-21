<template>
  <div class="imgUploadContainer">
    <div class="imgUploadPanel">
      <div class="upBtn" v-if="!value">
        <label
          for="imgUploadInput"
          class="imgUploadInputArea"
          @dragenter.stop.prevent
          @dragover.stop.prevent
          @drop.stop.prevent="onDrop"
          >点击此处选择图片、或拖动图片到此</label
        >
        <input
          type="file"
          accept="image/*"
          id="imgUploadInput"
          @change="onImgUploadInputChange"
        />
      </div>
      <div v-if="value" class="uploadInfoBox">
        <div
          class="previewBox"
          :style="{ backgroundImage: `url('${value}')` }"
        ></div>
        <span class="delBtn el-icon-close" @click="deleteImg"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImgUpload',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
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
     * @Author: 王林
     * @Date: 2019-12-22 19:47:19
     * @Desc: 图片选择事件
     */
    onImgUploadInputChange(e) {
      let file = e.target.files[0]
      this.selectImg(file)
    },

    /**
     * @Author: 王林
     * @Date: 2019-12-22 20:32:31
     * @Desc: 拖动上传图片
     */
    onDrop(e) {
      let dt = e.dataTransfer
      let file = dt.files && dt.files[0]
      this.selectImg(file)
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-06 16:56:14
     * @Desc: 选择图片
     */
    selectImg(file) {
      this.file = file
      let fr = new FileReader()
      fr.readAsDataURL(file)
      fr.onload = e => {
        this.$emit('change', e.target.result)
      }
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-22 23:03:46
     * @Desc: 获取图片大小
     */
    getSize() {
      return new Promise(resolve => {
        let img = new Image()
        img.src = this.value
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height
          })
        }
        img.onerror = () => {
          resolve({
            width: 0,
            height: 0
          })
        }
      })
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-06 21:59:57
     * @Desc: 删除图片
     */
    deleteImg() {
      this.$emit('change', '')
      this.file = null
    }
  }
}
</script>

<style lang="less" scoped>
@import './style.less';
</style>
