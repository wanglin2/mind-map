<template>
  <div class="block4Container">
    <div class="blockContent">
      <div class="infoBox">
        <div class="infoTitle">JavaScript库</div>
        <div class="info">
          simple-mind-map是一个简单&强大的Web思维导图库，不依赖任何特定框架，可以帮助你快速开发思维导图产品。
        </div>
        <div class="info">
          使用非常简单，只需三步即可渲染出一个思维导图：
        </div>
        <div class="info">第一步：安装</div>
        <div class="codeBox">
          <pre><code class="language-bash" ref="code1">
npm i simple-mind-map
            </code></pre>
        </div>
        <div class="info">第二步：引入</div>
        <div class="codeBox">
          <pre><code class="language-javascript" ref="code2">
import MindMap from "simple-mind-map"
            </code></pre>
        </div>
        <div class="info">第三步：实例化</div>
        <div class="codeBox">
          <pre><code class="language-javascript" ref="code3">
const mindMap = new MindMap({
  // 提供一个宽高不为0的容器元素
  el: document.getElementById('mindMapContainer'),
  // 思维导图数据
  data: {
    "data": {
        "text": "根节点"
    },
    "children": []
  }
})
            </code></pre>
        </div>
        <div class="btnList">
          <div class="btn" @click="jumpDoc">查看更多</div>
        </div>
      </div>
      <div class="picBox"></div>
    </div>
  </div>
</template>

<script>
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import bash from 'highlight.js/lib/languages/bash'
import 'highlight.js/styles/github.css'
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('bash', bash)

export default {
  mounted() {
    hljs.highlightElement(this.$refs.code1)
    hljs.highlightElement(this.$refs.code2)
    hljs.highlightElement(this.$refs.code3)
  },
  methods: {
    jumpDoc() {
      this.$router.push('/doc/zh/')
    }
  }
}
</script>

<style lang="less" scoped>
.block4Container {
  display: flex;
  justify-content: center;
  align-items: center;

  .blockContent {
    width: 100%;
    max-width: 1140px;
    display: flex;
    align-items: center;
    padding: 50px 0;

    .picBox {
      width: 500px;
      height: 500px;
      background-image: url('../../../assets/img/index/block4.png');
      flex-shrink: 0;
    }

    .infoBox {
      margin-right: 50px;

      .infoTitle {
        font-weight: 700;
        color: #1e3547;
        font-size: 40px;
      }

      .info {
        color: #828f99;
        font-size: 16px;
        line-height: 1.7;
        margin-top: 20px;
      }

      .codeBox {
        font-size: 16px;
        margin-top: 10px;
      }

      .btnList {
        display: flex;
        align-items: center;

        .btn {
          height: 44px;
          cursor: pointer;
          background: #1ea59a;
          border-color: #1ea59a;
          border-radius: 5px;
          transition: all 0.5s;
          margin-right: 10px;
          margin-top: 20px;
          height: 100%;
          padding: 0 20px;
          line-height: 44px;
          color: #fff;
          font-weight: 600;
          font-size: 15px;

          &:hover {
            transform: translateY(-4px);
          }
        }
      }
    }
  }
}
</style>
