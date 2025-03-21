<template>
  <div>
    <!-- 附件右键菜单 - 已移除，功能整合到主右键菜单 -->

    <!-- 综合对话框 - 同时处理上传和预览功能 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogType === 'upload' ? $t('attachment.upload') : $t('attachment.preview')"
      width="50%"
      :append-to-body="true"
      :modal-append-to-body="false"
      :destroy-on-close="true"
    >
      <template v-if="dialogType === 'upload'">
        <FileUpload 
          @success="onFileUploadSuccess" 
          @change="onFileUploadChange"
        />
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeDialog">{{ $t('common.cancel') }}</el-button>
        </span>
      </template>
      
      <template v-else-if="dialogType === 'preview'">
        <div class="attachment-preview-content">
          <!-- 图片预览 -->
          <div v-if="isImageFile" class="image-preview">
            <img 
              :src="currentAttachmentUrl" 
              alt="attachment preview" 
              @error="onImageLoadError" 
              class="preview-image"
            />
            <div v-if="imageError" class="error-message">
              <p>{{ $t('attachment.loadFailed') }}</p>
            </div>
          </div>
          
          <!-- PDF预览 -->
          <div v-else-if="isPdfFile" class="pdf-preview">
            <iframe 
              :src="currentAttachmentUrl" 
              width="100%" 
              height="600"
              class="preview-iframe"
            ></iframe>
          </div>
          
          <!-- Markdown预览 -->
          <div v-else-if="isMarkdownFile" class="markdown-preview">
            <div class="preview-toolbar">
              <el-switch
                v-model="showRawMarkdown"
                active-text="原始文本"
                inactive-text="渲染格式"
                size="small"
              ></el-switch>
            </div>
            
            <div v-if="showRawMarkdown" class="raw-markdown">
              <pre v-if="fileContent" class="preview-text">{{ fileContent }}</pre>
              <div v-else class="loading-content">正在加载Markdown内容...</div>
            </div>
            
            <div v-else>
              <div 
                v-if="fileContent" 
                v-html="renderedMarkdown" 
                class="markdown-content"
              ></div>
              <div v-else class="loading-content">
                正在加载Markdown内容...
              </div>
            </div>
          </div>
          
          <!-- 文本预览（包括Office文件） -->
          <div v-else-if="isTextFile" class="text-preview">
            <pre v-if="fileContent" class="preview-text">{{ fileContent }}</pre>
            <div v-else class="loading-content">正在加载文本内容...</div>
          </div>
          
          <!-- 其他文件 - 提供下载链接 -->
          <div v-else class="file-download">
            <p>{{ $t('attachment.cannotPreview') || '不支持此文件类型的预览，请下载后查看' }}</p>
          </div>
          
          <!-- 下载按钮（在所有预览类型中显示在底部居中） -->
          <div class="file-actions-bottom">
            <el-button type="primary" size="small" @click="downloadAttachment">
              <i class="el-icon-download"></i> {{ $t('attachment.download') }}
            </el-button>
          </div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import FileUpload from '@/components/FileUpload/index.vue'
import marked from 'marked'
import DOMPurify from 'dompurify'

export default {
  components: {
    FileUpload
  },
  props: {
    mindMap: {
      type: Object,
      default() {
        return null
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogType: 'upload', // 'upload' 或 'preview'
      fileUrl: '',
      fileName: '',
      currentAttachmentUrl: '',
      currentAttachmentName: '',
      fileContent: '',
      activeNodes: [],
      imageError: false,
      showRawMarkdown: false, // 是否显示原始Markdown文本
      renderedMarkdown: '',   // 存储渲染后的 Markdown HTML
    }
  },
  computed: {
    // 判断当前附件类型
    isImageFile() {
      if (!this.currentAttachmentName) return false
      const name = this.currentAttachmentName.toLowerCase()
      return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/.test(name)
    },
    isPdfFile() {
      if (!this.currentAttachmentName) return false
      const name = this.currentAttachmentName.toLowerCase()
      return /\.pdf$/.test(name)
    },
    isTextFile() {
      if (!this.currentAttachmentName) return false
      const name = this.currentAttachmentName.toLowerCase()
      
      // 如果文件名含有明确的扩展名
      if (/\.(txt|md|json|js|css|html|xml|csv|log)$/.test(name)) {
        return true
      }
      
      // 检查URL路径中是否包含关键词，表明可能是文本文件
      if (this.currentAttachmentUrl) {
        const url = this.currentAttachmentUrl.toLowerCase()
        if (url.includes('file-') && url.includes('.txt')) {
          return true
        }
      }
      
      return false
    },
    isMarkdownFile() {
      if (!this.currentAttachmentName) return false
      const name = this.currentAttachmentName.toLowerCase()
      return /\.md$/.test(name)
    },
    isOfficeFile() {
      if (!this.currentAttachmentName) return false
      const name = this.currentAttachmentName.toLowerCase()
      // 支持Word, Excel, PowerPoint文件
      return /\.(docx?|xlsx?|pptx?|dotx?|xltx?|potx?)$/.test(name)
    },
  },
  created() {
    this.$bus.$on('node_attachmentClick', this.onNodeAttachmentClick)
    this.$bus.$on('selectAttachment', this.onSelectAttachment)
    this.$bus.$on('node_showAttachment', this.onShow)
  },
  beforeDestroy() {
    this.$bus.$off('node_attachmentClick', this.onNodeAttachmentClick)
    this.$bus.$off('selectAttachment', this.onSelectAttachment)
    this.$bus.$off('node_showAttachment', this.onShow)
  },
  methods: {
    // 选择附件
    onSelectAttachment(activeNodes) {
      console.log('选择附件被触发，节点数:', activeNodes.length)
      this.activeNodes = activeNodes
      this.showUploadDialog()
    },

    // 显示上传对话框
    showUploadDialog() {
      this.dialogType = 'upload'
      this.dialogVisible = true
      this.fileUrl = ''
      this.fileName = ''
    },

    // 关闭对话框
    closeDialog() {
      this.dialogVisible = false
      this.fileContent = ''
      this.imageError = false
    },

    // 确认上传附件
    confirmUpload() {
      if (!this.fileUrl) {
        this.$message.warning(this.$t('attachment.noFileSelected'))
        return
      }

      console.log('确认上传附件:', this.fileUrl, this.fileName)
      
      // 如果没有文件名，尝试从URL中提取
      let attachmentName = this.fileName
      if (!attachmentName || attachmentName.trim() === '') {
        const urlParts = this.fileUrl.split('/')
        attachmentName = urlParts[urlParts.length - 1] || '未命名附件'
        console.log('从URL提取文件名:', attachmentName)
      }
      
      // 为选中的节点设置附件
      this.activeNodes.forEach(node => {
        node.setAttachment(this.fileUrl, attachmentName)
      })

      this.closeDialog()
      this.$message.success(this.$t('attachment.uploadSuccess'))
    },

    // 节点附件点击事件 - 由bus事件触发
    onNodeAttachmentClick(node, e, icon) {
      console.log('节点附件点击事件', node.getData('attachmentUrl'), node.getData('attachmentName'))
      const attachmentUrl = node.getData('attachmentUrl')
      const attachmentName = node.getData('attachmentName')
      
      if (!attachmentUrl) {
        this.$message.info(this.$t('attachment.noAttachment'))
        return
      }
      
      // 确保URL是完整的
      const fullUrl = this.ensureFullUrl(attachmentUrl)
      this.currentAttachmentUrl = fullUrl
      this.currentAttachmentName = attachmentName
      this.dialogType = 'preview'
      this.dialogVisible = true
      this.imageError = false
      
      console.log('是否为文本文件:', this.isTextFile, '判断依据:', attachmentName || attachmentUrl)
      
      // 如果是文本文件，加载文本内容
      if (this.isTextFile) {
        this.fileContent = null // 重置文件内容，显示加载中
        this.fetchTextFileContent(fullUrl)
      }
    },

    // 检查是否是本地文件
    isLocalFile(url) {
      if (!url) return false
      return !(url.startsWith('http://') || url.startsWith('https://') || url.startsWith('//'))
    },
    
    // 确保URL是完整的
    ensureFullUrl(url) {
      if (!url) return url
      
      // 如果已经是完整的URL，直接返回
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
      }
      
      // 如果是相对路径（以/开头），添加当前域名
      if (url.startsWith('/')) {
        return window.location.origin + url
      }
      
      // 其他情况，添加/到路径开头
      if (!url.startsWith('/')) {
        return '/' + url
      }
      
      return url
    },
    
    // 获取文本文件内容
    async fetchTextFileContent(url) {
      console.log('获取文本文件内容:', url)
      try {
        const response = await fetch(url)
        console.log('文本文件响应:', response)
        if (!response.ok) {
          throw new Error('网络响应错误: ' + response.status)
        }
        const text = await response.text()
        console.log('文本文件内容获取成功，长度:', text.length)
        
        let processedText = text
        
        // 如果是Markdown文件，处理一下文本确保换行正确
        if (this.isMarkdownFile) {
          // 处理可能的Windows换行符
          processedText = processedText.replace(/\r\n/g, '\n')
          
          // 确保段落之间有足够的空行
          processedText = processedText.replace(/\n\n+/g, '\n\n')
          
          // 预渲染Markdown
          this.renderedMarkdown = this.renderMarkdown(processedText)
        }
        
        this.fileContent = processedText
      } catch (error) {
        console.error('获取文件内容失败:', error)
        this.fileContent = this.$t('attachment.loadFailed') + ' - ' + error.message
        this.renderedMarkdown = ''
      }
    },

    // 下载文件
    downloadFile() {
      const a = document.createElement('a')
      a.href = this.currentAttachmentUrl
      a.download = this.currentAttachmentName
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    },

    // 处理图片加载错误
    onImageLoadError() {
      console.error('图片加载失败:', this.currentAttachmentUrl)
      this.imageError = true
    },

    // 渲染Markdown
    renderMarkdown(markdown) {
      if (!markdown) return ''
      try {
        // marked 4.3.0 版本的处理方式
        
        // 预处理 Markdown 文本
        let processedMarkdown = markdown;
        
        // 确保标题格式正确（# 后面需要空格）
        processedMarkdown = processedMarkdown.replace(/(^|\n)(#+)([^\s])/g, '$1$2 $3');
        
        // 确保段落之间有空行
        processedMarkdown = processedMarkdown.replace(/\n([^#\s\n][^\n]+)\n([^#\s\n])/g, '\n$1\n\n$2');
        
        // 确保列表项之前有空行
        processedMarkdown = processedMarkdown.replace(/\n([^\n]+)\n([ \t]*[-*+])/g, '\n$1\n\n$2');
        
        // 确保代码块前后有空行
        processedMarkdown = processedMarkdown.replace(/\n([^\n]+)\n(```)/g, '\n$1\n\n$2');
        processedMarkdown = processedMarkdown.replace(/(```.*\n[\s\S]*?```)\n([^\n])/g, '$1\n\n$2');
        
        // 设置 marked 选项
        marked.setOptions({
          breaks: true,       // 将换行符转换为 <br>
          gfm: true,          // GitHub 风格的 Markdown
          headerIds: true,    // 为标题添加 ID
          mangle: false,      // 不混淆标题 ID
          pedantic: false,    // 不那么严格的解析
          sanitize: false,    // 不执行内部消毒（我们使用 DOMPurify）
          smartLists: true,   // 智能列表
          xhtml: false        // 不使用 XHTML 闭合标签
        });

        // 创建自定义渲染器
        const renderer = new marked.Renderer();
        
        // 自定义标题渲染
        renderer.heading = function(text, level) {
          return `<h${level} class="md-heading md-heading-${level}">${text}</h${level}>`;
        };
        
        // 自定义段落渲染
        renderer.paragraph = function(text) {
          return `<p class="md-paragraph">${text}</p>`;
        };
        
        // 自定义列表渲染
        renderer.list = function(body, ordered, start) {
          const type = ordered ? 'ol' : 'ul';
          const startAttr = (ordered && start !== 1) ? ` start="${start}"` : '';
          return `<${type}${startAttr} class="md-list">${body}</${type}>`;
        };
        
        // 自定义列表项渲染
        renderer.listitem = function(text) {
          return `<li class="md-list-item">${text}</li>`;
        };
        
        // 设置渲染器
        marked.use({ renderer });
        
        // 执行渲染
        const html = marked.parse(processedMarkdown);
        
        // 清理 HTML 以防止 XSS
        return DOMPurify.sanitize(html);
      } catch (e) {
        console.error('Markdown 渲染错误:', e);
        
        // 发生错误时的备用渲染方法
        let html = markdown;
        
        // 标题转换（h1-h6）
        html = html.replace(/^(#{1,6})\s+(.*?)$/gm, function(match, hashes, content) {
          const level = hashes.length;
          return `<h${level} style="font-size: ${24 - (level - 1) * 2}px; font-weight: bold; margin: 16px 0;">${content}</h${level}>`;
        });
        
        // 保留换行
        html = html.replace(/\n/g, '<br>');
        
        return html;
      }
    },

    // 获取文件内容
    async getFileContent() {
      if (!this.currentAttachmentUrl) return
      
      try {
        // 使用 fetch 获取文件内容
        const response = await fetch(this.currentAttachmentUrl)
        if (!response.ok) {
          throw new Error(`获取文件内容失败: ${response.status}`)
        }
        
        let content = await response.text()
        
        // 对于 Markdown 文件，确保换行符正确处理
        if (this.isMarkdownFile) {
          // 将 Windows 风格的换行符 (\r\n) 转换为 Unix 风格的换行符 (\n)
          content = content.replace(/\r\n/g, '\n')
          
          // 确保段落之间有足够的空行
          content = content.replace(/\n\n+/g, '\n\n')
        }
        
        this.fileContent = content
        
        // 如果是 Markdown 文件，渲染内容
        if (this.isMarkdownFile) {
          this.renderedMarkdown = this.renderMarkdown(content)
        }
        
        return content
      } catch (error) {
        console.error('加载文件内容时出错:', error)
        this.$message.error(this.$t('attachment.loadFailed'))
        this.fileContent = ''
        return ''
      }
    },

    // 上传文件
    onUploadFile() {
      if (!this.activeNodes || this.activeNodes.length <= 0) return
      this.dialogVisible = true
      this.dialogType = 'upload'
    },

    // 文件上传状态变化
    onFileUploadChange(url, fileName) {
      console.log('NodeAttachment: 文件上传状态变化', url, fileName);
      this.fileUrl = url;
      this.fileName = fileName;
    },

    // 文件上传成功
    onFileUploadSuccess({ url, name, size, type }) {
      console.log('NodeAttachment: 接收到上传成功事件，文件信息:', { url, name, size, type })
      
      if (!this.activeNodes || this.activeNodes.length <= 0) {
        console.warn('NodeAttachment: 没有选中的节点，无法设置附件')
        return
      }
      
      try {
        // 为选中的节点设置附件
        this.activeNodes.forEach(node => {
          console.log('NodeAttachment: 为节点设置附件:', node.getData('text'))
          node.setAttachment(url, name)
        })
        
        // 关闭对话框并显示成功消息
        console.log('NodeAttachment: 关闭对话框')
        this.dialogVisible = false
        this.$message.success(this.$t('attachment.uploadSuccess'))
      } catch (error) {
        console.error('NodeAttachment: 设置附件时出错:', error)
        this.$message.error(this.$t('attachment.uploadFailed'))
      }
    },

    // 下载附件
    downloadAttachment() {
      if (!this.currentAttachmentUrl) return
      const link = document.createElement('a')
      link.href = this.currentAttachmentUrl
      link.download = this.currentAttachmentName || 'attachment'
      link.target = '_blank'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },

    onShow() {
      this.activeNodes = this.mindMap.renderer.activeElems
      const node = this.activeNodes && this.activeNodes.length > 0 ? this.activeNodes[0] : null
      if (!node) return
      
      // 获取当前节点的附件
      this.currentAttachmentUrl = node.getData('attachmentUrl') || ''
      this.currentAttachmentName = node.getData('attachmentName') || ''
      if (!this.currentAttachmentUrl) return
      
      // 重置状态
      this.dialogVisible = true
      this.dialogType = 'preview'
      this.imageError = false
      this.fileContent = ''
      this.renderedMarkdown = ''
      this.showRawMarkdown = false
      
      // 如果是文本文件，获取文本内容
      if (this.isTextFile || this.isMarkdownFile) {
        this.getFileContent()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.attachment-preview-content {
  padding: 20px;
  
  .text-preview {
    max-height: 500px;
    overflow-y: auto;
    padding: 15px;
    background: #f5f5f5;
    border-radius: 4px;
    white-space: pre-wrap;
    
    pre {
      margin: 0;
      font-family: monospace;
    }
    
    .loading-content {
      text-align: center;
      padding: 20px;
      color: #999;
    }
  }
  
  .image-preview {
    text-align: center;
    
    img {
      max-width: 100%;
      max-height: 500px;
      object-fit: contain;
    }
    
    .image-error {
      margin-top: 20px;
      padding: 15px;
      background: #fff6f6;
      border-radius: 4px;
      color: #f56c6c;
    }
  }
  
  .pdf-preview {
    height: 600px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    overflow: hidden;
    
    iframe {
      border: none;
    }
  }
  
  .file-download {
    text-align: center;
    padding: 30px;
    background: #f8f8f8;
    border-radius: 4px;
    
    p {
      margin-bottom: 15px;
      color: #606266;
    }
  }
}
</style>

<style>
/* 确保对话框有正确的层级和遮罩 */
.el-dialog__wrapper {
  z-index: 2001 !important; 
}

.v-modal {
  z-index: 2000 !important;
}
</style>

<style scoped>
.attachment-preview-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.file-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.file-actions-bottom {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.image-preview {
  text-align: center;
  max-height: 70vh;
  overflow: auto;
}

.preview-image {
  max-width: 100%;
  object-fit: contain;
}

.preview-iframe {
  width: 100%;
  height: 70vh;
  border: 1px solid #eee;
}

.text-preview,
.markdown-preview {
  max-height: 70vh;
  overflow: auto;
  padding: 15px;
  border: 1px solid #eee;
  border-radius: 4px;
  background-color: #f8f8f8;
}

.preview-toolbar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px dashed #e0e0e0;
}

.raw-markdown {
  background-color: #f8f8f8;
  border-radius: 4px;
  padding: 10px;
  font-family: monospace;
}

.raw-markdown pre {
  white-space: pre-wrap;
  margin: 0;
}

.preview-text {
  white-space: pre-wrap;
  font-family: monospace;
  margin: 0;
  padding: 0;
}

.markdown-content {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  line-height: 1.6;
  word-break: break-word;
  overflow-wrap: break-word;
}

.markdown-content h1,
.markdown-content h2 {
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-content h1 {
  font-size: 2em;
}

.markdown-content h2 {
  font-size: 1.5em;
}

.markdown-content h3 {
  font-size: 1.25em;
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-content h4, 
.markdown-content h5, 
.markdown-content h6 {
  font-weight: 600;
  line-height: 1.25;
  margin-top: 24px;
  margin-bottom: 16px;
}

.markdown-content p, 
.markdown-content ul, 
.markdown-content ol {
  margin-bottom: 16px;
}

.markdown-content pre {
  background-color: #f6f8fa;
  border-radius: 3px;
  padding: 16px;
  overflow: auto;
  margin-bottom: 16px;
}

.markdown-content code {
  background-color: rgba(27, 31, 35, 0.05);
  border-radius: 3px;
  padding: 0.2em 0.4em;
  font-family: SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace;
}

.markdown-content blockquote {
  padding: 0 1em;
  color: #6a737d;
  border-left: 0.25em solid #dfe2e5;
  margin: 0 0 16px 0;
}

.markdown-content a {
  color: #0366d6;
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.markdown-content table {
  border-collapse: collapse;
  margin-bottom: 16px;
  width: 100%;
  overflow: auto;
}

.markdown-content table th,
.markdown-content table td {
  border: 1px solid #dfe2e5;
  padding: 6px 13px;
}

.markdown-content table tr {
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
}

.markdown-content table tr:nth-child(2n) {
  background-color: #f6f8fa;
}

.loading-content {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #909399;
}

.error-message {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  color: #f56c6c;
  text-align: center;
  flex-direction: column;
}

.error-message .preview-tip {
  font-size: 14px;
  color: #909399;
  margin-top: 5px;
}

.file-download {
  text-align: center;
  padding: 20px;
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
  color: #606266;
}
</style>
