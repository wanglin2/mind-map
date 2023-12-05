<template>
  <div class="block2Container">
    <div class="blockContent">
      <div class="blockTitle">为什么选择Simple mind map？</div>
      <div class="dataList">
        <div class="dataItem" v-for="(item, index) in dataList" :key="index">
          <div class="iconBox">
            <span class="icon iconfont" :class="[item.icon]"></span>
          </div>
          <div class="dataValue">{{ item.value }}</div>
        </div>
      </div>
      <div class="desc">
        如果你是开发者：Simple mind
        map提供了一个功能完善的 js 思维导图库，不依赖任何框架，你可以使用它来快速完成Web思维导图产品的开发。
      </div>
      <div class="desc">
        如果你是使用者：Simple mind
        map提供了一个完整的思维导图软件，支持在线和客户端两种使用方式，所有功能完全免费。
      </div>
      <div class="functionList">
        <div
          class="functionItem"
          v-for="(item, index) in functionList"
          :key="index"
        >
          <div class="icon iconfont" :class="[item.icon]"></div>
          <div class="info">
            <div class="name">{{ item.name }}</div>
            <div class="value">{{ item.value }}</div>
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
      dataList: [
        {
          icon: 'iconstar',
          value: 'Github star数量2000+'
        },
        {
          icon: 'iconfork',
          value: 'Github fork数量250+'
        },
        {
          icon: 'iconxiazai',
          value: 'npm总下载次数20000+'
        },
        {
          icon: 'iconteamwork',
          value: '代码贡献者14+'
        }
      ],
      functionList: [
        {
          icon: 'iconjingzi',
          name: '主题',
          value: '内置多种主题，允许高度自定义样式，支持注册新主题。'
        },
        {
          icon: 'iconjiegou',
          name: '结构',
          value:
            '支持常见的逻辑结构图、思维导图、组织结构图、目录组织图、时间轴、鱼骨图结构。'
        },
        {
          icon: 'iconjianpan',
          name: '快捷键',
          value: '常用操作支持快捷键，方便使用。'
        },
        {
          icon: 'iconzitixiahuaxian',
          name: '富文本',
          value:
            '节点支持普通文本和富文本两种类型，通过富文本可以创建样式丰富的节点文本内容。'
        },
        {
          icon: 'iconimage',
          name: '图片',
          value: '选中任一节点，选择上传图片，让内容达到图文并茂。'
        },
        {
          icon: 'icongaikuozonglan',
          name: '概要',
          value: '补充表述几个节点之间的关系。'
        },
        {
          icon: 'iconxiaolian',
          name: '图标',
          value: '通过添加图标来让节点内容更丰富。'
        },
        {
          icon: 'iconchaolianjie',
          name: '超链接',
          value: '节点可插入超链接，鼠标点击即可实现跳转。'
        },
        {
          icon: 'iconflow-Mark',
          name: '备注',
          value: '详细的内容可以放在备注中，节点内显得更简单明了。'
        },
        {
          icon: 'iconbiaoqian',
          name: '标签',
          value: '如果添加带颜色的标签，来突出要表达的重点。'
        },
        {
          icon: 'iconlianjiexian',
          name: '关联线',
          value: '通过添加关联线来表明节点之间的关联关系。'
        },
        {
          icon: 'iconmouseL',
          name: '拖动',
          value: '画布和节点都可以进行拖动。'
        },
        {
          icon: 'icondaohang',
          name: '导航器',
          value: '通过导航器可以方便知道当前画布处于思维导图的哪个部分。'
        },
        {
          icon: 'icondaochu',
          name: '导入导出',
          value: '支持多种文件格式的导入和导出。'
        },
        {
          icon: 'iconshuiyin',
          name: '水印',
          value: '内置支持水印功能，防止隐私泄露。'
        },
        {
          icon: 'iconwithdraw',
          name: '前进后退',
          value: '不小心误操作删除或修改内容支持一键撤回或恢复。'
        },
        {
          icon: 'iconfuhao-dagangshu',
          name: '大纲',
          value: '根据大纲编辑思维导图，让内容更详细也不容易出错。'
        },
        {
          icon: 'iconshezhi',
          name: '丰富的设置',
          value: '提供了丰富的功能设置，可以选择合适你的操作行为。'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.block2Container {
  display: flex;
  justify-content: center;
  align-items: center;

  .blockContent {
    padding: 100px 0;
    width: 100%;
    max-width: 1140px;

    .dataList {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
      .dataItem {
        box-shadow: 0 5px 30px -10px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
        margin-right: 30px;
        padding: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;

        &:last-of-type {
          margin-right: 0;
        }

        .iconBox {
          width: 55px;
          height: 55px;
          border-radius: 10px;
          background-color: rgba(30, 165, 154, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;

          .icon {
            font-size: 30px;
            color: #1ea59a;
          }
        }

        .dataValue {
          color: #1e3547;
          font-weight: 700;
        }
      }
    }

    .blockTitle {
      font-size: 30px;
      font-weight: 700;
      color: #1e3547;
      text-align: center;
      margin-bottom: 40px;
    }

    .desc {
      color: #828f99;
      font-size: 17px;
      line-height: 1.7;
    }

    .functionList {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 60px;
      .functionItem {
        display: flex;
        width: 30%;
        margin-bottom: 50px;

        .icon {
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 50px;
          margin-right: 24px;
          color: #1ea59a;
        }

        .info {
          .name {
            margin-bottom: 5px;
            color: #1e3547;
            font-weight: 600;
            font-size: 18px;
          }

          .value {
            font-size: 14px;
            color: #828f99;
          }
        }
      }
    }
  }
}
</style>
