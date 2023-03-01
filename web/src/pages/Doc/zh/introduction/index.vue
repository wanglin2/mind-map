<template>
  <div>
    <h1>简介</h1>
<p><code>simple-mind-map</code>是一个简单&amp;强大的Web思维导图库，不依赖任何特定框架。</p>
<h2>特性</h2>
<ul>
<li><input type="checkbox" id="checkbox0" checked="true"><label for="checkbox0">插件化架构，除核心功能外，其他功能作为插件提供，按需使用，减小整体体积</label></li>
<li><input type="checkbox" id="checkbox1" checked="true"><label for="checkbox1">支持逻辑结构图、思维导图、组织结构图、目录组织图四种结构</label></li>
<li><input type="checkbox" id="checkbox2" checked="true"><label for="checkbox2">内置多种主题，允许高度自定义样式，支持注册新主题</label></li>
<li><input type="checkbox" id="checkbox3" checked="true"><label for="checkbox3">支持快捷键</label></li>
<li><input type="checkbox" id="checkbox4" checked="true"><label for="checkbox4">节点内容支持图片、图标、超链接、备注、标签、概要</label></li>
<li><input type="checkbox" id="checkbox5" checked="true"><label for="checkbox5">支持前进后退</label></li>
<li><input type="checkbox" id="checkbox6" checked="true"><label for="checkbox6">支持拖动、缩放</label></li>
<li><input type="checkbox" id="checkbox7" checked="true"><label for="checkbox7">支持右键和Ctrl+左键两种多选方式</label></li>
<li><input type="checkbox" id="checkbox8" checked="true"><label for="checkbox8">支持节点自由拖拽、拖拽调整</label></li>
<li><input type="checkbox" id="checkbox9" checked="true"><label for="checkbox9">支持多种节点形状</label></li>
<li><input type="checkbox" id="checkbox10" checked="true"><label for="checkbox10">支持导出为</label><code>json</code>、<code>png</code>、<code>svg</code>、<code>pdf</code>，支持从<code>json</code>、<code>xmind</code>导入</li>
<li><input type="checkbox" id="checkbox11" checked="true"><label for="checkbox11">支持小地图、支持水印</label></li>
</ul>
<h2>目录介绍</h2>
<p>1.<code>simple-mind-map</code></p>
<p>思维导图工具库，框架无关，<code>Vue</code>、<code>React</code>等框架或无框架都可以使用。</p>
<p>2.<code>web</code></p>
<p>使用<code>simple-mind-map</code>工具库，基于<code>vue2.x</code>、<code>ElementUI</code>搭建的在线思维导图。特性：</p>
<ul>
<li><input type="checkbox" id="checkbox12" checked="true"><label for="checkbox12">工具栏，支持插入节点、删除节点；编辑节点图片、图标、超链接、备注、标签、概要</label></li>
<li><input type="checkbox" id="checkbox13" checked="true"><label for="checkbox13">侧边栏，基础样式设置面板、节点样式设置面板、大纲面板、主题选择面板、结构选择面板</label></li>
<li><input type="checkbox" id="checkbox14" checked="true"><label for="checkbox14">导入导出功能；数据默认保存在浏览器本地存储，也支持直接创建、打开、编辑电脑本地文件</label></li>
<li><input type="checkbox" id="checkbox15" checked="true"><label for="checkbox15">右键菜单，支持展开、收起、整理布局等操作</label></li>
<li><input type="checkbox" id="checkbox16" checked="true"><label for="checkbox16">底部栏，支持节点数量、字数统计；支持切换编辑和只读模式；支持放大缩小；支持全屏切换；支持小地图</label></li>
</ul>
<p>提供文档页面服务。</p>
<p>3.<code>dist</code></p>
<p>打包<code>web</code>后的资源文件夹。</p>
<p>4.<code>docs</code></p>
<p>文档等。</p>
<h2>相关文章</h2>
<p><a href="https://juejin.cn/post/6987711560521089061">Web思维导图实现的技术点分析</a></p>
<p><a href="https://juejin.cn/post/7157681502506090510">只需百来行代码，为你的Web页面增加本地文件操作能力，确定不试试吗？</a></p>
<p><a href="https://juejin.cn/post/7199666255883927612">当你按下方向键，电视是如何寻找下一个焦点的</a></p>
<p><a href="https://juejin.cn/post/7204854015463538744">如何在canvas中模拟css的背景图片样式</a></p>
<h2>特别说明</h2>
<p>本项目较粗糙，未进行完整测试，功能尚不是很完善，性能也存在一些问题，尤其当节点数量比较庞大的时候，仅用于学习和参考，请谨慎用于实际项目。</p>
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