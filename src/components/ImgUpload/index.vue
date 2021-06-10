<template>
  <div class="imgUploadContainer">
    <div class="imgUploadPanel">
      <div class="upBtn" v-if="!previewSrc">
        <label
          for="imgUploadInput"
          class="imgUploadInputArea"
          @dragenter.stop.prevent
          @dragover.stop.prevent
          @drop.stop.prevent="onDrop"
          v-loading="loading"
          element-loading-text="上传中..."
          >点击此处添加图片、或拖动图片到此</label
        >
        <input
          type="file"
          accept="image/*"
          id="imgUploadInput"
          @change="onImgUploadInputChange"
        />
      </div>
      <div v-if="previewSrc" class="uploadInfoBox">
        <div
          class="previewBox"
          :style="{ backgroundImage: `url('${previewSrc}')` }"
        ></div>
        <span class="delBtn el-icon-close" @click="deleteImg"></span>
      </div>
    </div>
  </div>
</template>

<script>
import ossUpLoader from "@/utils/oss";

export default {
  name: "ImgUpload",
  data() {
    return {
      file: null,
      previewSrc: "",
      loading: false,
    };
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2019-12-22 19:47:19
     * @Desc: 图片选择事件
     */
    onImgUploadInputChange(e) {
      let file = e.target.files[0];
      this.uploadImg(file);
    },

    /**
     * @Author: 王林
     * @Date: 2019-12-22 20:32:31
     * @Desc: 拖动上传图片
     */
    onDrop(e) {
      let dt = e.dataTransfer;
      let file = dt.files && dt.files[0];
      this.uploadImg(file);
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-06 16:56:14
     * @Desc: 显示图片
     */
    showImg(file) {
      this.file = file;
      let fr = new FileReader();
      fr.readAsDataURL(file);
      fr.onload = (e) => {
        this.previewSrc = e.target.result;
      };
    },

    /**
     * @Author: 王林
     * @Date: 2019-12-22 19:51:13
     * @Desc: 上传图片
     */
    async uploadImg(file) {
      this.loading = true;
      ossUpLoader.uploadFile(
        file,
        () => {},
        (e) => {
          this.previewSrc = e[0].res.requestUrls[0]
          this.loading = false;
        },
        (e) => {
          if (e.length > 0) {
            this.loading = false;
            this.$message({
              message: "上传失败",
              type: "warning",
            });
          }
        }
      );
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-06 22:33:28
     * @Desc: 获取图片url
     */
    getUrl() {
      return this.this.previewSrc;
    },

    /**
     * @Author: 王林
     * @Date: 2021-06-06 21:59:57
     * @Desc: 删除图片
     */
    deleteImg() {
      this.previewSrc = "";
      this.file = null;
    },
  },
};
</script>

<style lang="less" scoped>
@import "./style.less";
</style>
