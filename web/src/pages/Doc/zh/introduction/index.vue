<template>
  <div>
    <h1>简介</h1>
<p><code>simple-mind-map</code>是一个简单&amp;强大的Web思维导图库，不依赖任何特定框架。可以帮助你快速开发思维导图产品。</p>
<h2>特性</h2>
<ul>
<li><input type="checkbox" id="checkbox198" checked="true"><label for="checkbox198">插件化架构，除核心功能外，其他功能作为插件提供，按需使用，减小整体体积</label></li>
<li><input type="checkbox" id="checkbox199" checked="true"><label for="checkbox199">支持逻辑结构图、思维导图、组织结构图、目录组织图四种结构</label></li>
<li><input type="checkbox" id="checkbox200" checked="true"><label for="checkbox200">内置多种主题，允许高度自定义样式，支持注册新主题</label></li>
<li><input type="checkbox" id="checkbox201" checked="true"><label for="checkbox201">支持快捷键</label></li>
<li><input type="checkbox" id="checkbox202" checked="true"><label for="checkbox202">节点内容支持图片、图标、超链接、备注、标签、概要</label></li>
<li><input type="checkbox" id="checkbox203" checked="true"><label for="checkbox203">支持前进后退</label></li>
<li><input type="checkbox" id="checkbox204" checked="true"><label for="checkbox204">支持拖动、缩放</label></li>
<li><input type="checkbox" id="checkbox205" checked="true"><label for="checkbox205">支持右键和Ctrl+左键两种多选方式</label></li>
<li><input type="checkbox" id="checkbox206" checked="true"><label for="checkbox206">支持节点自由拖拽、拖拽调整</label></li>
<li><input type="checkbox" id="checkbox207" checked="true"><label for="checkbox207">支持多种节点形状</label></li>
<li><input type="checkbox" id="checkbox208" checked="true"><label for="checkbox208">支持导出为</label><code>json</code>、<code>png</code>、<code>svg</code>、<code>pdf</code>、<code>markdown</code>，支持从<code>json</code>、<code>xmind</code>、<code>markdown</code>导入</li>
<li><input type="checkbox" id="checkbox209" checked="true"><label for="checkbox209">支持小地图、支持水印</label></li>
<li><input type="checkbox" id="checkbox210" checked="true"><label for="checkbox210">支持关联线</label></li>
</ul>
<h2>仓库目录介绍</h2>
<p>1.<code>simple-mind-map</code></p>
<p>思维导图库，框架无关，<code>Vue</code>、<code>React</code>等框架或无框架都可以使用。</p>
<p>2.<code>web</code></p>
<p>使用<code>simple-mind-map</code>库，基于<code>vue2.x</code>、<code>ElementUI</code>搭建的在线思维导图。特性：</p>
<ul>
<li><input type="checkbox" id="checkbox211" checked="true"><label for="checkbox211">工具栏，支持插入节点、删除节点；编辑节点图片、图标、超链接、备注、标签、概要</label></li>
<li><input type="checkbox" id="checkbox212" checked="true"><label for="checkbox212">侧边栏，基础样式设置面板、节点样式设置面板、大纲面板、主题选择面板、结构选择面板</label></li>
<li><input type="checkbox" id="checkbox213" checked="true"><label for="checkbox213">导入导出功能；数据默认保存在浏览器本地存储，也支持直接创建、打开、编辑电脑本地文件</label></li>
<li><input type="checkbox" id="checkbox214" checked="true"><label for="checkbox214">右键菜单，支持展开、收起、整理布局等操作</label></li>
<li><input type="checkbox" id="checkbox215" checked="true"><label for="checkbox215">底部栏，支持节点数量、字数统计；支持切换编辑和只读模式；支持放大缩小；支持全屏切换；支持小地图</label></li>
</ul>
<p>提供文档页面服务。</p>
<p>3.<code>dist</code></p>
<p>打包<code>web</code>后的资源文件夹。</p>
<h2>相关文章</h2>
<p><a href="https://juejin.cn/post/6987711560521089061">Web思维导图实现的技术点分析</a></p>
<p><a href="https://juejin.cn/post/7157681502506090510">只需百来行代码，为你的Web页面增加本地文件操作能力，确定不试试吗？</a></p>
<p><a href="https://juejin.cn/post/7199666255883927612">当你按下方向键，电视是如何寻找下一个焦点的</a></p>
<p><a href="https://juejin.cn/post/7204854015463538744">如何在canvas中模拟css的背景图片样式</a></p>
<h2>特别说明</h2>
<p>本项目可用于学习和参考，用于实际项目时请先深度体验一下是否能满足您的需求。</p>
<p>本项目可能没有完整测试到每一个功能点，所以可能存在bug，另外，当节点数量非常多的时候，性能也存在一些问题，因为每个人能接受的卡顿程度不一样，所以你可以自行测试节点数量上限。</p>
<p>如果有建议或发现了bug，可以在此提交<a href="https://github.com/wanglin2/mind-map/issues">issues</a>。</p>
<p>项目内置的主题和图标来自于：</p>
<p><a href="https://naotu.baidu.com/">百度脑图</a></p>
<p><a href="https://www.zhixi.com/">知犀思维导图</a></p>
<p>尊重版权，主题和图标请勿直接用于商业项目。</p>
<h2>License</h2>
<p><a href="https://opensource.org/licenses/MIT">MIT</a></p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>