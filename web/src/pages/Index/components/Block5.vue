<template>
  <div class="block5Container">
    <div class="blockContent">
      <div class="infoBox">
        <div class="infoTitle">理想青年实验室</div>
        <div class="infoDesc">
          专注前端、写作、开源。
        </div>
        <div class="linkBtnList">
          <div class="linkBtn">
            <a href="https://github.com/wanglin2" target="_blank">
              <span class="linkBtnIcon iconfont icongithub"></span>
            </a>
          </div>
          <div class="linkBtn">
            <a href="https://juejin.cn/user/325111170756279" target="_blank">
              <span class="linkBtnIcon text">掘金</span>
            </a>
          </div>
          <div class="linkBtn">
            <a
              href="https://segmentfault.com/u/jiejiaoxiaolin/articles"
              target="_blank"
            >
              <span class="linkBtnIcon text">思否</span>
            </a>
          </div>
          <div class="linkBtn">
            <a href="http://lxqnsys.com/" target="_blank">
              <span class="linkBtnIcon iconfont iconwangzhan"></span>
            </a>
          </div>
          <div class="linkBtn">
            <a
              href="https://www.zhihu.com/people/wang-lin-49-43-65"
              target="_blank"
            >
              <span class="linkBtnIcon iconfont iconshejiaotubiao-10"></span>
            </a>
          </div>
          <div class="linkBtn">
            <a
              href="https://blog.csdn.net/sinat_33488770?type=blog"
              target="_blank"
            >
              <span class="linkBtnIcon iconfont iconcsdn"></span>
            </a>
          </div>
        </div>
      </div>
      <div class="linkBox">
        <div class="linkTitle">更多作品</div>
        <div class="linkList">
          <div class="linkItem" v-for="item in linkList" :key="item.name">
            <el-tooltip
              :content="item.desc"
              placement="top"
            >
              <a :href="item.url" target="_blank">{{ item.name }}</a>
            </el-tooltip>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      linkList: [
        {
          name: 'CodeRun',
          url: 'https://github.com/wanglin2/code-run',
          desc: '一个代码在线编辑预览工具，类似codepen、jsbin、jsfiddle等'
        },
        {
          name: 'TinyWhiteboard',
          url: 'https://github.com/wanglin2/tiny_whiteboard',
          desc: '一个在线小白板，类似excalidraw'
        },
        {
          name: 'Mark.js',
          url: 'https://github.com/wanglin2/markjs',
          desc: '一个插件化的多边形标注库'
        },
        {
          name: 'WebMapEngine',
          url: 'https://github.com/wanglin2/web_map_demo',
          desc: '一个简单的2D地图加载器'
        },
        {
          name: 'SimpleNoviceGuide',
          url: 'https://github.com/wanglin2/simple-novice-guide',
          desc: ' 一个简洁的新手引导库'
        },
        {
          name: 'CanvasEditor',
          url: 'https://github.com/wanglin2/canvas-editor-demo',
          desc: '一个用Canvas做的富文本编辑器Demo'
        },
        {
          name: 'JsonTreeView',
          url: 'https://github.com/wanglin2/json-tree-view',
          desc: '一个简洁的json格式化插件'
        },
        {
          name: 'SimpleFlowChart',
          url: 'https://github.com/wanglin2/simple-flow-chart',
          desc: '一个用flex布局做的流程设计器'
        },
        {
          name: 'VideoTimeLine',
          url: 'https://github.com/wanglin2/VideoTimeLine',
          desc: '一个基于Vue2的视频时间轴组件'
        },
        {
          name: 'MarkdownEditor',
          url: 'https://github.com/wanglin2/markdown_editor_sync_scroll_demo',
          desc: '一个能精确同步滚动的Markdown编辑器'
        },
        {
          name: 'AssociationLine',
          url: 'https://github.com/wanglin2/AssociationLineDemo',
          desc: '关联线探究，如何连接流程图的两个节点'
        },
        {
          name: 'HandPaintedStyle',
          url: 'https://github.com/wanglin2/handPaintedStyle',
          desc: '手绘风格图形的简单实现'
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.block5Container {
  background-color: #f0f9fa;
  border-radius: 450px 0 0 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .blockContent {
    width: 100%;
    max-width: 1140px;
    height: 350px;
    display: flex;
    padding-top: 100px;

    .infoBox {
      .infoTitle {
        font-size: 20px;
        font-weight: 700;
        color: #1e3547;
        line-height: 1.4;
        margin-bottom: 20px;
      }

      .infoDesc {
        color: #828f99;
        font-size: 16px;
      }

      .linkBtnList {
        margin-top: 30px;
        display: flex;
        align-items: center;
        .linkBtn {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          overflow: hidden;
          background-color: #f0f9fa;
          border: 2px solid #dbf1f1;
          margin-right: 10px;

          a {
            width: 100%;
            height: 100%;
            text-decoration: none;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: all 0.5s;

            &:hover {
              background-color: #1ea59a;

              .linkBtnIcon {
                color: #fff;
              }
            }

            .linkBtnIcon {
              font-size: 20px;
              color: #1e3547;
              transition: all 0.5s;

              &.text {
                font-size: 13px;
              }
            }
          }
        }
      }
    }

    .linkBox {
      margin-left: 150px;
      .linkTitle {
        font-size: 20px;
        font-weight: 700;
        color: #1e3547;
        line-height: 1.4;
        margin-bottom: 20px;
      }

      .linkList {
        display: flex;
        flex-wrap: wrap;

        .linkItem {
          margin-right: 20px;
          margin-bottom: 10px;

          a {
            color: #828f99;
            font-size: 15px;
            transition: all 0.5s;
            text-decoration: none;

            &:hover {
              color: #1ea59a;
            }
          }
        }
      }
    }
  }
}
</style>
