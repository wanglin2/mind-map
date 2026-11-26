const { ipcRenderer } = require('electron');
const MindMap = require('simple-mind-map').default;

// 初始化思维导图
let mindMap = null;
let currentFilePath = null;

function initMindMap() {
  const container = document.getElementById('app');
  container.innerHTML = `
    <div class="toolbar">
      <button onclick="addNode()">添加节点</button>
      <button onclick="deleteNode()">删除节点</button>
      <button onclick="addSibling()">添加兄弟节点</button>
      <button onclick="addChild()">添加子节点</button>
      <button onclick="zoomIn()">放大</button>
      <button onclick="zoomOut()">缩小</button>
      <button onclick="resetZoom()">重置缩放</button>
      <span style="margin-left: auto; color: #666; font-size: 12px;">开源思维导图 v1.0.0</span>
    </div>
    <div id="mind-map-container"></div>
  `;

  mindMap = new MindMap({
    el: document.getElementById('mind-map-container'),
    data: {
      data: {
        text: '中心主题',
        children: []
      }
    },
    fit: true,
    theme: 'default',
    layout: 'logicalStructure'
  });

  // 监听主进程消息
  ipcRenderer.on('new-file', () => {
    newFile();
  });

  ipcRenderer.on('open-file', (event, { filePath, content }) => {
    openFile(filePath, content);
  });

  ipcRenderer.on('save-file', () => {
    saveFile();
  });

  ipcRenderer.on('save-file-as', (event, filePath) => {
    saveFileAs(filePath);
  });

  ipcRenderer.on('export-image', () => {
    exportImage();
  });

  ipcRenderer.on('export-pdf', () => {
    exportPdf();
  });
}

// 工具函数
window.addNode = function() {
  if (mindMap) {
    mindMap.execCommand('INSERT_NODE');
  }
};

window.deleteNode = function() {
  if (mindMap) {
    mindMap.execCommand('REMOVE_NODE');
  }
};

window.addSibling = function() {
  if (mindMap) {
    mindMap.execCommand('INSERT_SIBLING_NODE');
  }
};

window.addChild = function() {
  if (mindMap) {
    mindMap.execCommand('INSERT_CHILD_NODE');
  }
};

window.zoomIn = function() {
  if (mindMap) {
    mindMap.view.enlarge();
  }
};

window.zoomOut = function() {
  if (mindMap) {
    mindMap.view.narrow();
  }
};

window.resetZoom = function() {
  if (mindMap) {
    mindMap.view.reset();
  }
};

// 文件操作
function newFile() {
  if (mindMap) {
    mindMap.setFullData({
      data: {
        text: '中心主题',
        children: []
      }
    });
    currentFilePath = null;
  }
}

function openFile(filePath, content) {
  try {
    const data = JSON.parse(content);
    if (mindMap) {
      mindMap.setFullData(data);
      currentFilePath = filePath;
    }
  } catch (error) {
    alert('文件解析失败：' + error.message);
  }
}

function saveFile() {
  if (!currentFilePath) {
    saveFileAs();
    return;
  }
  
  const data = mindMap.getData();
  ipcRenderer.invoke('save-file', {
    filePath: currentFilePath,
    content: JSON.stringify(data, null, 2)
  }).then(result => {
    if (result.success) {
      alert('保存成功！');
    } else {
      alert('保存失败：' + result.error);
    }
  });
}

function saveFileAs(filePath) {
  if (!filePath) {
    // 如果没有提供路径，需要请求主进程打开保存对话框
    // 这里简化处理，直接保存到默认位置
    alert('请使用"另存为"菜单选择保存位置');
    return;
  }
  
  currentFilePath = filePath;
  saveFile();
}

function exportImage() {
  if (!mindMap) return;
  
  mindMap.export('png').then(({ svg, url }) => {
    // 这里需要主进程配合保存图片
    alert('导出功能开发中...');
  }).catch(err => {
    alert('导出失败：' + err.message);
  });
}

function exportPdf() {
  alert('PDF 导出功能开发中...');
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initMindMap);
