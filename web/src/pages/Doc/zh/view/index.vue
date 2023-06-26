<template>
  <div>
    <h1>View实例</h1>
<p><code>view</code>实例负责视图操作，可通过<code>mindMap.view</code>获取到该实例</p>
<h2>方法</h2>
<h3>fit()</h3>
<blockquote>
<p>v0.6.0+</p>
</blockquote>
<p>缩放思维导图至适应画布。</p>
<h3>translateX(step)</h3>
<p><code>x</code>方向进行平移，<code>step</code>：要平移的像素</p>
<h3>translateY(step)</h3>
<p><code>y</code>方向进行平移，<code>step</code>：要平移的像素</p>
<h3>translateXTo(x)</h3>
<blockquote>
<p>v0.2.11+</p>
</blockquote>
<p>平移<code>x</code>方向到指定位置</p>
<h3>translateYTo(y)</h3>
<blockquote>
<p>v0.2.11+</p>
</blockquote>
<p>平移<code>y</code>方向到指定位置</p>
<h3>reset()</h3>
<p>恢复到默认的变换</p>
<h3>narrow(cx, cy)</h3>
<ul>
<li>
<p><code>cx</code>：（v0.6.4+）以画布指定位置进行缩放，默认为画布中心点</p>
</li>
<li>
<p><code>cy</code>：（v0.6.4+）以画布指定位置进行缩放，默认为画布中心点</p>
</li>
</ul>
<p>缩小</p>
<h3>enlarge(cx, cy)</h3>
<ul>
<li>
<p><code>cx</code>：（v0.6.4+）以画布指定位置进行缩放，默认为画布中心点</p>
</li>
<li>
<p><code>cy</code>：（v0.6.4+）以画布指定位置进行缩放，默认为画布中心点</p>
</li>
</ul>
<p>放大</p>
<h3>getTransformData()</h3>
<blockquote>
<p>v0.1.1+</p>
</blockquote>
<p>获取当前变换数据，可用于回显</p>
<h3>setTransformData(data)</h3>
<blockquote>
<p>v0.1.1+</p>
</blockquote>
<p>动态设置变换数据，可以通过getTransformData方法获取变换数据</p>
<h3>setScale(scale, cx, cy)</h3>
<blockquote>
<p>v0.2.17+</p>
</blockquote>
<ul>
<li>
<p><code>cx</code>：（v0.6.4+）以画布指定位置进行缩放，默认为画布中心点</p>
</li>
<li>
<p><code>cy</code>：（v0.6.4+）以画布指定位置进行缩放，默认为画布中心点</p>
</li>
</ul>
<p>设置缩放</p>

  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>