<template>
  <el-dialog
    :title="$t('attachment.preview')"
    :visible.sync="dialogVisible"
    width="60%"
    :append-to-body="true"
    class="attachmentPreviewDialog"
  >
    <div v-if="loading" class="loading">
      <i class="el-icon-loading"></i>
    </div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="previewContent">
      <!-- 文本文件预览 -->
      <div v-if="isTextFile" class="textPreview">
        <pre v-if="fileContent">{{ fileContent }}</pre>
        <div v-else class="loading-text">正在加载文本内容...</div>
      </div>
      
      <!-- 图片预览 -->
      <div v-else-if="isImageFile" class="imagePreview">
        <img :src="fullFileUrl" alt="图片预览" @error="handleImageError" />
        <div v-if="imageError" class="error-message">
          图片加载失败。
          <el-button type="primary" size="small" @click="downloadFile">下载</el-button>
        </div>
      </div>
      
      <!-- PDF预览 -->
      <div v-else-if="isPdfFile" class="pdfPreview">
        <iframe :src="fullFileUrl" width="100%" height="500" @load="handleIframeLoad" @error="handleIframeError"></iframe>
        <div v-if="iframeError" class="error-message">
          PDF 加载失败。
          <el-button type="primary" size="small" @click="downloadFile">下载</el-button>
        </div>
      </div>
      
      <!-- 不支持预览的文件类型 -->
      <div v-else class="unsupportedFile">
        {{ $t('attachment.cannotPreview') }}
        <el-button type="primary" @click="downloadFile">{{ $t('attachment.download') }}</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { fileServerBaseUrl } from '@/config';

export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      error: null,
      fileUrl: '',
      fileName: '',
      fileContent: '',
      fullFileUrl: '',
      imageError: false,
      iframeError: false
    };
  },
  
  computed: {
    // 判断是否为文本文件
    isTextFile() {
      // 使用文件扩展名判断
      const ext = this.getFileExtension(this.fileUrl).toLowerCase();
      console.log('判断文件类型 - 文件扩展名:', ext);
      return ['.txt', '.md', '.json', '.js', '.css', '.html', '.xml', '.csv', '.log'].includes(ext);
    },
    
    // 判断是否为图片文件
    isImageFile() {
      const ext = this.getFileExtension(this.fileUrl).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'].includes(ext);
    },
    
    // 判断是否为PDF文件
    isPdfFile() {
      const ext = this.getFileExtension(this.fileUrl).toLowerCase();
      return ext === '.pdf';
    },
    
    // 文件类型显示
    fileType() {
      if (this.isTextFile) return '文本文件';
      if (this.isImageFile) return '图片文件';
      if (this.isPdfFile) return 'PDF文件';
      return '其他';
    }
  },
  
  methods: {
    // 显示附件预览
    show(fileUrl, fileName) {
      console.log('AttachmentPreview.show() - 参数:', { fileUrl, fileName });
      
      this.dialogVisible = true;
      this.fileUrl = fileUrl;
      this.fileName = fileName || '';
      this.error = null;
      this.fileContent = '';
      this.imageError = false;
      this.iframeError = false;
      
      // 构建完整URL
      if (fileUrl.startsWith('http')) {
        this.fullFileUrl = fileUrl;
      } else {
        // 移除前导斜杠，避免双斜杠问题
        const cleanFileUrl = fileUrl.startsWith('/') ? fileUrl.substring(1) : fileUrl;
        this.fullFileUrl = `${fileServerBaseUrl}/${cleanFileUrl}`;
      }
      
      console.log('构建的完整URL:', this.fullFileUrl);
      
      // 检查文件扩展名
      const ext = this.getFileExtension(fileUrl).toLowerCase();
      console.log('文件扩展名:', ext);
      
      this.fetchFileContent();
    },
    
    // 获取文件内容
    async fetchFileContent() {
      if (!this.isTextFile) return;
      
      try {
        this.loading = true;
        console.log('开始获取文本文件内容', this.fullFileUrl);
        
        const response = await fetch(this.fullFileUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        this.fileContent = await response.text();
        console.log('文本内容获取成功, 内容长度:', this.fileContent.length);
      } catch (error) {
        console.error('加载文件内容失败:', error);
        this.error = `加载失败: ${error.message}`;
      } finally {
        this.loading = false;
      }
    },
    
    // 从URL中获取文件名
    getFileNameFromUrl(url) {
      if (!url) return '未知文件';
      
      // 移除查询参数
      const cleanUrl = url.split('?')[0];
      const parts = cleanUrl.split('/');
      return parts[parts.length - 1] || '未知文件';
    },
    
    // 从URL中获取文件扩展名
    getFileExtension(url) {
      if (!url) return '';
      
      // 移除查询参数
      const cleanUrl = url.split('?')[0];
      
      // 先尝试从文件名中获取扩展名
      const fileName = this.getFileNameFromUrl(cleanUrl);
      const lastDotPos = fileName.lastIndexOf('.');
      
      if (lastDotPos !== -1) {
        return fileName.substring(lastDotPos);
      }
      
      return '';
    },
    
    // 下载文件
    downloadFile() {
      console.log('下载文件:', this.fullFileUrl);
      window.open(this.fullFileUrl, '_blank');
    },
    
    // 处理图片加载错误
    handleImageError(event) {
      console.error('图片加载失败:', this.fullFileUrl);
      this.imageError = true;
    },
    
    // 处理iframe加载
    handleIframeLoad() {
      console.log('iframe 加载成功');
      this.iframeError = false;
    },
    
    // 处理iframe错误
    handleIframeError() {
      console.error('iframe 加载失败:', this.fullFileUrl);
      this.iframeError = true;
    }
  }
};
</script>

<style lang="less" scoped>
.attachmentPreviewDialog {
  .loading {
    text-align: center;
    padding: 20px;
    font-size: 24px;
  }
  
  .error {
    color: red;
    text-align: center;
    padding: 20px;
  }
  
  .previewContent {
    .textPreview {
      max-height: 400px;
      overflow: auto;
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 4px;
      
      pre {
        white-space: pre-wrap;
        word-wrap: break-word;
        margin: 0;
      }
      
      .loading-text {
        text-align: center;
        padding: 20px;
        color: #666;
      }
    }
    
    .imagePreview {
      text-align: center;
      
      img {
        max-width: 100%;
        max-height: 400px;
      }
      
      .error-message {
        margin-top: 10px;
        color: #f56c6c;
      }
    }
    
    .pdfPreview {
      .error-message {
        margin-top: 10px;
        color: #f56c6c;
        text-align: center;
      }
    }
    
    .unsupportedFile {
      text-align: center;
      padding: 20px;
    }
  }
}
</style> 