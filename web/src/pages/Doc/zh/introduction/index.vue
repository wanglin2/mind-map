<template>
  <div>
    <h1>简介</h1>
<p><code>simple-mind-map</code>是一个简单&amp;强大的Web思维导图库，不依赖任何特定框架。可以帮助你快速开发思维导图产品。</p>
<blockquote>
<p>如果你只是想使用思维导图，你也完全可以把本项目的demo作为一个普通的在线思维导图工具使用。点击右上角的【在线示例】开始使用吧。</p>
<p>另外也提供了客户端可供下载，支持<code>Windows</code>、<code>Mac</code>及<code>Linux</code>，<a href="/mind-map/#/doc/zh/client">点此了解更多</a>。</p>
</blockquote>
<h2>特性</h2>
<ul>
<li><input type="checkbox" id="checkbox18" checked="true" /><label for="checkbox18">插件化架构，除核心功能外，其他功能作为插件提供，按需使用，减小整体体积</label></li>
<li><input type="checkbox" id="checkbox19" checked="true" /><label for="checkbox19">支持逻辑结构图、思维导图、组织结构图、目录组织图、时间轴、鱼骨图六种结构</label></li>
<li><input type="checkbox" id="checkbox20" checked="true" /><label for="checkbox20">内置多种主题，允许高度自定义样式，支持注册新主题</label></li>
<li><input type="checkbox" id="checkbox21" checked="true" /><label for="checkbox21">支持快捷键</label></li>
<li><input type="checkbox" id="checkbox22" checked="true" /><label for="checkbox22">节点内容支持图片、图标、超链接、备注、标签、概要</label></li>
<li><input type="checkbox" id="checkbox23" checked="true" /><label for="checkbox23">支持前进后退</label></li>
<li><input type="checkbox" id="checkbox24" checked="true" /><label for="checkbox24">支持拖动、缩放</label></li>
<li><input type="checkbox" id="checkbox25" checked="true" /><label for="checkbox25">支持右键和Ctrl+左键两种多选方式</label></li>
<li><input type="checkbox" id="checkbox26" checked="true" /><label for="checkbox26">支持节点自由拖拽、拖拽调整</label></li>
<li><input type="checkbox" id="checkbox27" checked="true" /><label for="checkbox27">支持多种节点形状</label></li>
<li><input type="checkbox" id="checkbox28" checked="true" /><label for="checkbox28">支持导出为</label><code>json</code>、<code>png</code>、<code>svg</code>、<code>pdf</code>、<code>markdown</code>，支持从<code>json</code>、<code>xmind</code>、<code>markdown</code>导入</li>
<li><input type="checkbox" id="checkbox29" checked="true" /><label for="checkbox29">支持小地图、支持水印</label></li>
<li><input type="checkbox" id="checkbox30" checked="true" /><label for="checkbox30">支持关联线</label></li>
</ul>
<h2>仓库目录介绍</h2>
<p>1.<code>simple-mind-map</code></p>
<p>思维导图库，框架无关，<code>Vue</code>、<code>React</code>等框架或无框架都可以使用。</p>
<p>2.<code>web</code></p>
<p>使用<code>simple-mind-map</code>库，基于<code>vue2.x</code>、<code>ElementUI</code>搭建的在线思维导图。特性：</p>
<ul>
<li><input type="checkbox" id="checkbox31" checked="true" /><label for="checkbox31">工具栏，支持插入节点、删除节点；编辑节点图片、图标、超链接、备注、标签、概要</label></li>
<li><input type="checkbox" id="checkbox32" checked="true" /><label for="checkbox32">侧边栏，基础样式设置面板、节点样式设置面板、大纲面板、主题选择面板、结构选择面板</label></li>
<li><input type="checkbox" id="checkbox33" checked="true" /><label for="checkbox33">导入导出功能；数据默认保存在浏览器本地存储，也支持直接创建、打开、编辑电脑本地文件</label></li>
<li><input type="checkbox" id="checkbox34" checked="true" /><label for="checkbox34">右键菜单，支持展开、收起、整理布局等操作</label></li>
<li><input type="checkbox" id="checkbox35" checked="true" /><label for="checkbox35">底部栏，支持节点数量、字数统计；支持切换编辑和只读模式；支持放大缩小；支持全屏切换；支持小地图</label></li>
</ul>
<p>提供文档页面服务。</p>
<p>3.<code>dist</code></p>
<p>打包<code>web</code>后的资源文件夹。</p>
<h2>相关文章</h2>
<p><a href="https://juejin.cn/post/6987711560521089061">Web思维导图实现的技术点分析</a></p>
<p><a href="https://juejin.cn/post/7157681502506090510">只需百来行代码，为你的Web页面增加本地文件操作能力，确定不试试吗？</a></p>
<p><a href="https://juejin.cn/post/7199666255883927612">当你按下方向键，电视是如何寻找下一个焦点的</a></p>
<p><a href="https://juejin.cn/post/7204854015463538744">如何在canvas中模拟css的背景图片样式</a></p>
<p><a href="https://juejin.cn/post/7233012756314701884">我的第一个Electron应用</a></p>
<h2>特别说明</h2>
<p>本项目可用于学习和参考，用于实际项目时请先深度体验一下是否能满足您的需求。</p>
<p>本项目可能没有完整测试到每一个功能点，所以可能存在bug，另外，当节点数量非常多的时候，性能也存在一些问题，因为每个人能接受的卡顿程度不一样，所以你可以自行测试节点数量上限。</p>
<p>如果有建议或发现了bug，可以在此提交<a href="https://github.com/wanglin2/mind-map/issues">issues</a>。</p>
<p>项目内置的主题和图标来自于：</p>
<p><a href="https://naotu.baidu.com/">百度脑图</a></p>
<p><a href="https://www.zhixi.com/">知犀思维导图</a></p>
<p>尊重版权，主题和图标请勿直接用于商业项目。</p>
<h2>为什么不是？</h2>
<p>1.<a href="https://www.zhixi.com/">知犀</a></p>
<p>知犀是一个免费的思维导图产品，支持多端同步，ui设计很漂亮，功能也很齐全，但是它并不开源，所以只能作为一个用户，而无法在你的项目中使用。</p>
<p>类似知犀的其他在线思维导图产品还有很多，比如<a href="https://gitmind.cn/">GitMind</a>、<a href="http://www.mindline.cn/">MindLine</a>、<a href="https://www.mindmeister.com/zh">MinMeister</a>、<a href="https://mubu.com/">幕布</a>等等，搜索引擎上搜索一下非常多，但是这些产品或者是要收费，或者是小公司开发的，稳定性和持续性无法保证，当然最关键的就是它们都不开源。</p>
<p>2.<a href="https://github.com/fex-team/kityminder-core">kityminder-core</a></p>
<p><code>kityminder-core</code>是百度开发的开源的脑图工具，功能很强大，性能也很好，但是它已经不维护了，所以代码比较陈旧，界面美观度也比较一般，另外bug只能自己修，功能只能自己开发，对前端开发能力要求比较高。</p>
<p>3.<a href="https://github.com/hizzgdev/jsmind">jsmind</a>、<a href="https://github.com/ssshooter/mind-elixir-core">Mind-elixir</a>、<a href="https://github.com/ondras/my-mind">my-mind</a>、<a href="https://github.com/awehook/blink-mind">blink-mind</a>、<a href="https://github.com/luvsic3/remind">remind</a>、<a href="https://github.com/hellowuxin/vue3-mindmap">vue3-mindmap</a>、<a href="https://github.com/zyascend/ZMindMap">ZMindMap</a>...</p>
<p>这些开源的思维导图也都不错，各有各的特点，但是它们也都有一定缺点，比如停止更新、界面美观度一般、功能比较少、依赖某个框架等等。</p>
<p>综上，在开源的思维导图中，你很难找到一个比<code>simple-mind-map</code>更好的选择。当然，<code>simple-mind-map</code>也远远谈不上最好，它也有很多不足，如你在前面的【特别说明】所看到的那样，不过<code>simple-mind-map</code>一直处于快速迭代中，欢迎你加入进来一起完善它。</p>
<h2>浏览器兼容性</h2>
<p>推荐使用最新版<code>chrome</code>浏览器。</p>
<p>有限测试情况：</p>
<p>正常运行：<code>360</code>极速浏览器（v13.5.2036.0）、<code>opera</code>浏览器（v71.0.3770.284）。</p>
<p>非正常运行：<code>Firefox</code>（v98.0.2），富文本模式下节点内容无法显示，如果要支持<code>Firefox</code>浏览器，请使用非富文本模式。</p>
<p>不支持：<code>IE</code>浏览器。</p>
<h2>License</h2>
<p><a href="https://opensource.org/licenses/MIT">MIT</a></p>
<h2>请作者喝杯咖啡</h2>
<p>开源不易，如果本项目有帮助到你的话，可以请作者喝杯咖啡哟~</p>
<blockquote>
<p>转账请备注【思维导图】。你的头像和名字将会出现在下面。</p>
</blockquote>
<img src="../../../../assets/img/alipay.jpg" style="width: 300px" />
<img src="../../../../assets/img/wechat.jpg" style="width: 300px" />
<div  style="display: flex;">
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/Think.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>Think</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/志斌.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>志斌</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/小土渣的宇宙.jpeg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>小土渣的宇宙</p>
    </div>
</div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>