<template>
  <div>
    <h1>Introduction</h1>
<p><code>simple-mind-map</code> is a simple and powerful web mind map library, not dependent on any specific framework. Can help you quickly develop mind mapping products.</p>
<blockquote>
<p>If you just want to use mind mapping, you can also use the demo of this project as a regular online mind mapping tool. Click on the 【Online Demo】 in the upper right corner to start using it.</p>
<p>Additionally, a client is provided for download, support <code>Windows</code>、<code>Mac</code> and <code>Linux</code>, <a href="/mind-map/#/doc/zh/client">Click here to learn more</a>。</p>
</blockquote>
<h2>Features</h2>
<ul>
<li><input type="checkbox" id="checkbox16" checked="true" /><label for="checkbox16">Pluggable architecture, in addition to core functions, other functions are provided as plugins, which can be used as needed to reduce packaging volume</label></li>
<li><input type="checkbox" id="checkbox17" checked="true" /><label for="checkbox17">Support logical structure chart, mind map, Organizational chart, directory organization chart, timeline (horizontal and vertical), fishbone chart and other structures</label></li>
<li><input type="checkbox" id="checkbox18" checked="true" /><label for="checkbox18">Built-in multiple themes, allowing for highly customizable styles, and supporting registration of new themes</label></li>
<li><input type="checkbox" id="checkbox19" checked="true" /><label for="checkbox19">Node content supports text (regular text, rich text), images, icons, hyperlinks, notes, labels, summaries, and math formulas</label></li>
<li><input type="checkbox" id="checkbox20" checked="true" /><label for="checkbox20">Nodes support drag and drop (drag and move, freely adjust), multiple node shapes, and fully customize node content using DDM</label></li>
<li><input type="checkbox" id="checkbox21" checked="true" /><label for="checkbox21">Support canvas dragging and scaling</label></li>
<li><input type="checkbox" id="checkbox22" checked="true" /><label for="checkbox22">Supports two multi node selection methods: mouse button drag selection and Ctrl+left button selection</label></li>
<li><input type="checkbox" id="checkbox23" checked="true" /><label for="checkbox23">Supoorts to export as </label><code>json</code>、<code>png</code>、<code>svg</code>、<code>pdf</code>、<code>markdown</code>、<code>xmind</code>, support import from <code>json</code>、<code>xmind</code>、<code>markdown</code></li>
<li><input type="checkbox" id="checkbox24" checked="true" /><label for="checkbox24">Support shortcut keys, forward and backward, correlation lines, search and replacement, small maps, watermarks, and scrollbar</label></li>
<li><input type="checkbox" id="checkbox25" checked="true" /><label for="checkbox25">Provide rich configurations to meet various scenarios and usage habits</label></li>
<li><input type="checkbox" id="checkbox26" checked="true" /><label for="checkbox26">Support collaborative editing</label></li>
</ul>
<h2>Repository Catalog Introduction</h2>
<p>1.<code>simple-mind-map</code></p>
<p>This is a mind map library that is framework-agnostic and can be used with
frameworks such as Vue and React, or without a framework.</p>
<p>2.<code>web</code></p>
<p>This is an online mind map built using the <code>simple-mind-map</code> library and based
on <code>Vue2.x</code> and <code>ElementUI</code>. Features include:</p>
<ul>
<li><input type="checkbox" id="checkbox27" checked="true" /><label for="checkbox27">Toolbar, which supports inserting and deleting nodes, and editing node</label>
images, icons, hyperlinks, notes, tags, and summaries</li>
<li><input type="checkbox" id="checkbox28" checked="true" /><label for="checkbox28">Sidebar, with panels for basic style settings, node style settings,</label>
outline, theme selection, and structure selection</li>
<li><input type="checkbox" id="checkbox29" checked="true" /><label for="checkbox29">Import and export functionality; data is saved in the browser's local</label>
storage by default, but it also supports creating, opening, and editing
local files on the computer directly</li>
<li><input type="checkbox" id="checkbox30" checked="true" /><label for="checkbox30">Right-click menu, which supports operations such as expanding, collapsing,</label>
and organizing layout</li>
<li><input type="checkbox" id="checkbox31" checked="true" /><label for="checkbox31">Bottom bar, which supports node and word count statistics, switching</label>
between edit and read-only modes, zooming in and out, and switching to
full screen, support mini map</li>
</ul>
<p>Provide document page service.</p>
<p>3.<code>dist</code></p>
<p>The folder containing the packaged resources for the <code>web</code> folder.</p>
<h2>Related Articles</h2>
<p><a href="https://juejin.cn/post/6987711560521089061">Technical Analysis of Web Mind Map Implementation (chi)</a></p>
<p><a href="https://juejin.cn/post/7157681502506090510">Only a hundred lines of code are needed to add local file operation capability to your Web page. Are you sure not to try?</a></p>
<p><a href="https://juejin.cn/post/7199666255883927612">When you press the direction key, how does the TV find the next focus</a></p>
<p><a href="https://juejin.cn/post/7204854015463538744">How to simulate the background image style of css in canvas</a></p>
<p><a href="https://juejin.cn/post/7233012756314701884">My first Electron application</a></p>
<p><a href="https://juejin.cn/post/7276712861514170409">Explore how to export HTML and SVG as images</a></p>
<p><a href="https://juejin.cn/post/7287913415803764747">How does the dom-to-image library convert HTML into images</a></p>
<p><a href="https://juejin.cn/post/7295669711533998117">Two days to achieve collaborative editing of mind maps? It's really possible to use Yjs</a></p>
<h2>Special Note</h2>
<p>This project can be used for learning and reference. Please deeply experience whether it can meet your needs when using it for actual projects.</p>
<p>This project may not have fully tested every function point, so there may be bugs. In addition, when the number of nodes is very large, there may be some performance issues. Because everyone can accept different levels of congestion, you can test the maximum number of nodes yourself. Generally speaking, within 500 nodes, it is more smooth, while over 1000 nodes have more noticeable lag.</p>
<p>If you have suggestions or find bugs, you can submit <a href="https://github.com/wanglin2/mind-map/issues">issues</a> here.</p>
<p>The built-in themes and icons in the project part come from:</p>
<p><a href="https://naotu.baidu.com/">Baidu Mind Map</a></p>
<p><a href="https://www.zhixi.com/">Zhixi Mind Map</a></p>
<p>Respect the copyright, and do not use the theme and icons directly for commercial projects.</p>
<h2>Why not？</h2>
<p>1.<a href="https://www.zhixi.com/">Zhixi</a></p>
<p>Zhixi is a free mind mapping product that supports multi end synchronization. The UI design is beautiful and the features are complete, but it is not open source, so it can only be used as a user and cannot be used in your project.</p>
<p>There are many other online mind mapping products similar to Zhixi, such as <a href="https://gitmind.cn/">GitMind</a>、<a href="http://www.mindline.cn/">MindLine</a>、<a href="https://www.mindmeister.com/zh">MinMeister</a>、<a href="https://mubu.com/">Mubu</a> and so on, There are many searches on search engines, but these products either require fees or are developed by small companies, and their stability and sustainability cannot be guaranteed. Of course, the most crucial thing is that they are not open-source.</p>
<p>2.<a href="https://github.com/fex-team/kityminder-core">kityminder-core</a></p>
<p><code>kityminder-core</code> is an open source brain mapping tool developed by Baidu. It has powerful functions and good performance, but it is no longer maintained. Therefore, the code is relatively old, and the interface beauty is relatively ordinary. In addition, bugs can only be fixed by yourself, and the functions can only be developed by yourself. It has high requirements for front-end development capabilities.</p>
<p>3.<a href="https://github.com/hizzgdev/jsmind">jsmind</a>、<a href="https://github.com/ssshooter/mind-elixir-core">Mind-elixir</a>、<a href="https://github.com/ondras/my-mind">my-mind</a>、<a href="https://github.com/awehook/blink-mind">blink-mind</a>、<a href="https://github.com/luvsic3/remind">remind</a>、<a href="https://github.com/hellowuxin/vue3-mindmap">vue3-mindmap</a>、<a href="https://github.com/zyascend/ZMindMap">ZMindMap</a>、<a href="https://github.com/RockyRen/mindmaptree">mindmaptree</a>...</p>
<p>These open-source mind maps are also good, each with its own characteristics, but they also have certain drawbacks, such as stopping updates, average interface aesthetics, less functionality, relying on a certain framework, and so on.</p>
<p>In summary, in open-source mind maps, it is difficult to find a better choice than <code>simple-mind-map</code>. Of course, <code>simple-mind-map</code> is far from being the best, and it also has many shortcomings, as you saw in the previous [special note]. However, <code>simple-mind-map</code> has always been in a fast iteration process, and we welcome you to join and improve it together.</p>
<h2>Browser Compatibility</h2>
<p>We recommend using the latest version of the <code>Chrome</code> browser.</p>
<p>Limited testing situation:</p>
<p>Normal operation: <code>360</code> extreme speed browser（v13.5.2036.0）、<code>opera</code> browser（v71.0.3770.284）、<code>Firefox</code>（v98.0.2）.</p>
<p>Unsupported: <code>IE</code> browser.</p>
<h2>License</h2>
<p><a href="https://opensource.org/licenses/MIT">MIT</a></p>
<h2>Invite the author to a cup of coffee</h2>
<p>Open source is not easy. If this project is helpful to you, you can invite the author to have a cup of coffee~</p>
<blockquote>
<p>Please note the 【mind map】 for transfer.</p>
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
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/qp.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>qp</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/ZXR.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>ZXR</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/花儿朵朵.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>花儿朵朵</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/suka.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>suka</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/Chris.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>Chris</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/水车.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>水车</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/仓鼠.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>仓鼠</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/千帆.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>千帆</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/才镇.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>才镇</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/小米.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>小米bbᯤ²ᴳ</p>
    </div>
</div>
<div style="display: flex;">
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/棐.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>*棐</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/default.png" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>Luke</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/布林.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>布林</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/南风.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>南风</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/蜉蝣撼大叔.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>蜉蝣撼大叔</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/乙.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>乙</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/敏.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>敏</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/沐风牧草.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>沐风牧草</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/有希.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>有希</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/樊笼.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>樊笼</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/达仁科技.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>达仁科技</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/小逗比.png" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>小逗比</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/天清如愿.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>天清如愿</p>
    </div>
</div>
<div style="display: flex;">
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/敬明朗.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>敬明朗</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/default.png" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>飞箭</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/戚永峰.png" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>戚永峰</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/moom.jpg" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>moom</p>
    </div>
    <div style="display: flex; flex-direction: column; align-items: center; width: fit-content; margin: 5px;">
        <img src="../../../../assets/avatar/张扬.png" style="width: 50px;height: 50px;object-fit: cover;border-radius: 50%;" />
        <p>张扬</p>
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