<template>
  <div>
    <el-dialog
      class="vipDialog"
      title="思绪会员"
      :visible.sync="dialogVisible"
      width="700px"
      @close="onClose"
    >
      <div class="vipBox customScrollbar">
        <div class="statusBox">
          <div class="left" :class="{ isVIP: isVIP }">
            <span class="iconfont iconhuiyuan-"></span>您{{
              isVIP ? '已' : '还不'
            }}是会员~
          </div>
          <div class="center">
            <div class="btn" @click="vipFunctionDialogVisible = true">
              会员功能一览
            </div>
          </div>
          <div class="right"></div>
        </div>
        <div class="desc">
          <p>
            从0.13.1版本开始，<span class="btn" @click="open('plugins')"
              >SimpleMindMap付费插件</span
            >的功能在客户端中也需要付费才能使用。
          </p>
          <p>
            一定的收益可以带给开发者持续开发和维护的动力，希望您能理解。当然，您也可以选择安装之前的版本：<span
              class="btn"
              @click="open('baiduNet')"
              >百度云</span
            >或<span class="btn" @click="open('releases')">Github</span
            >。或者使用：<span class="btn" @click="open('online')">在线版</span
            >。
          </p>
        </div>
        <p>
          思绪会员为<span class="emphasize">终身制</span
          >，后续所有新出的功能均无需再次付费。目前价格为：<span
            class="emphasize"
            >￥100</span
          >。最多允许三台电脑使用。
        </p>
        <p>
          <strong>购买方式：</strong>扫码进行支付，请备注<span class="emphasize"
            >会员购买</span
          >，支付完成后，可以手动将下面的<span class="btn" @click="doCopy(uuid)"
            >机器码</span
          >发送到指定邮箱<span class="btn" @click="doCopy(mailAddress)">{{
            mailAddress
          }}</span
          >。
          <!-- 也可以直接点击：<span class="btn" @click="sendMail">一键发送</span
          >。 -->
        </p>
        <div class="desc">
          <p>
            最多可发送三个机器码，您可以打开其他需要使用的电脑安装思绪思维导图，然后打开会员弹窗复制机器码一并进行发送。当然，也可以日后再单独发送。
          </p>
          <p>
            如果您觉得发邮件比较麻烦，也可以直接微信添加：<span
              class="btn"
              @click="doCopy('wanglinguanfang')"
              >wanglinguanfang</span
            >。然后直接发送机器码即可。
          </p>
        </div>
        <p>
          <strong>支付方式：</strong>
          <span class="btn" @click="openPayDialog('alipay')"
            >点此支付宝支付</span
          >
          或
          <span class="btn" @click="openPayDialog('wechat')">点此微信支付</span>
        </p>
        <p class="row">
          <span class="text">机器码：</span>
          <el-input v-model="uuid" size="small" readonly>
            <el-button slot="append" @click="doCopy(uuid)">复制</el-button>
          </el-input>
        </p>
        <p class="row">
          <span class="text">邮箱地址：</span>
          <el-input v-model="mailAddress" size="small" readonly>
            <el-button slot="append" @click="doCopy(mailAddress)"
              >复制</el-button
            >
          </el-input>
        </p>
        <div class="desc">
          <p>
            温馨提醒：因为是人工录入，所以存在一定延迟，录入完成后会发送提醒邮件，当您收到邮件后可以尝试重新启动客户端，或者点击：<span
              class="btn"
              @click="refreshVIP"
              >刷新会员状态</span
            >。
          </p>
          <p>
            如有疑问，可添加微信咨询：<span
              class="btn"
              @click="doCopy('wanglinguanfang')"
              >wanglinguanfang</span
            >。
          </p>
        </div>
      </div>
    </el-dialog>
    <el-dialog
      class="qrCodeDialog"
      :title="showPayType === 'alipay' ? '支付宝扫码' : '微信扫码'"
      :visible.sync="qrCodeDialogVisible"
      width="400px"
      @close="qrCodeDialogVisible = false"
    >
      <div>
        <img
          src="../../../assets/img/alipay.jpg"
          alt=""
          v-if="showPayType === 'alipay'"
        />
        <img
          src="../../../assets/img/wechat.jpg"
          alt=""
          v-if="showPayType === 'wechat'"
        />
      </div>
    </el-dialog>
    <el-dialog
      class="vipFunctionDialog"
      title="会员功能一览"
      :visible.sync="vipFunctionDialogVisible"
      width="800px"
      @close="vipFunctionDialogVisible = false"
    >
      <div class="tableBox">
        <el-table :data="functionList" style="width: 100%;" height="450">
          <el-table-column
            type="index"
            width="50"
            :index="indexMethod"
          ></el-table-column>
          <el-table-column prop="name" label="功能" width="150">
          </el-table-column>
          <el-table-column prop="desc" label="描述"> </el-table-column>
          <el-table-column prop="img" label="截图">
            <template slot-scope="scope">
              <img style="width: 200px;" :src="scope.row.img" alt="" />
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { copy } from '@/utils'
import img1 from '@/assets/img/vip/1.png'
import img2 from '@/assets/img/vip/2.jpg'
import img3 from '@/assets/img/vip/3.jpg'
import img4 from '@/assets/img/vip/4.png'
import img5 from '@/assets/img/vip/5.png'
import img6 from '@/assets/img/vip/6.png'
import img7 from '@/assets/img/vip/7.gif'
import img8 from '@/assets/img/vip/8.gif'

const functionList = [
  {
    name: '手绘风格',
    desc:
      '开启后思维导图连线和形状会显示为手绘风格样式。可以在【设置】里开启或关闭。',
    img: img1
  },
  {
    name: '节点标记',
    desc:
      '可以标记单个节点，也就是可以在单个节点上加一个手绘风格的圈、背景、删除线等等，支持动画效果。',
    img: img2
  },
  {
    name: '节点编号',
    desc: '可以一键编号某个节点的子节点，支持多种编号形式，支持编号指定层级。',
    img: img3
  },
  {
    name: '导出Freemind文件',
    desc: '可以导入和导出Freemind软件的格式，即.mm文件格式。',
    img: img4
  },
  {
    name: '导出Excel文件',
    desc: '可以导入和导出Excel软件的格式，即.xlsx文件格式。',
    img: img5
  },
  {
    name: '节点待办',
    desc:
      '支持给节点添加待办，即可以给节点添加一个勾选框，点击勾选框可以切换完成和未完成的状态。',
    img: img6
  },
  {
    name: '节点连线流动效果',
    desc: '可以给节点连线添加流动效果，仅在连线为虚线的情况下生效。',
    img: img7
  },
  {
    name: '动量效果',
    desc:
      '开启后，鼠标按住拖动画布，然后松开后画布会根据惯性继续移动一段距离。可以在【设置】里开启或关闭。',
    img: img8
  }
]

export default {
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      uuid: '',
      qrCodeDialogVisible: false,
      mailAddress: '1013335014@qq.com',
      showPayType: '',
      vipFunctionDialogVisible: false,
      functionList
    }
  },
  computed: {
    ...mapState(['isVIP'])
  },
  watch: {
    value(val, oldVal) {
      this.dialogVisible = val
      if (val) {
        this.getUUID()
      }
    }
  },
  created() {
    this.getUUID()
  },
  methods: {
    async getUUID() {
      try {
        if (this.uuid) return
        const clientUUID = await window.electronAPI.getClientUUID()
        this.uuid = clientUUID
      } catch (error) {
        console.log(error)
      }
    },

    indexMethod(index) {
      return index + 1
    },

    openPayDialog(type) {
      this.showPayType = type
      this.qrCodeDialogVisible = true
    },

    doCopy(text) {
      copy(text)
      this.$message.success('复制成功')
    },

    refreshVIP() {
      this.$bus.$emit('refreshVIP', true)
    },

    async sendMail() {
      const mailtoUrl = `mailto:${
        this.mailAddress
      }?subject=${encodeURIComponent('会员购买')}&body=${encodeURIComponent(
        this.uuid
      )}`
      try {
        await window.electronAPI.openExternal(mailtoUrl)
      } catch (error) {
        console.log(error)
        this.$message.error('一键发送失败，请手动发送')
      }
    },

    onClose() {
      this.$emit('change', false)
    },

    open(type) {
      let url = ''
      switch (type) {
        case 'plugins':
          url =
            'https://wanglin2.github.io/mind-map-docs/plugins/handDrawnLikeStyle.html'
          break
        case 'baiduNet':
          url = 'https://pan.baidu.com/s/1huasEbKsGNH2Af68dvWiOg?pwd=3bp3'
          break
        case 'releases':
          url = 'https://github.com/wanglin2/mind-map/releases'
          break
        case 'online':
          url = 'https://wanglin2.github.io/mind-map/'
          break
        default:
          break
      }
      window.electronAPI.openUrl(url)
    }
  }
}
</script>

<style lang="less" scoped>
.vipDialog,
.qrCodeDialog,
.vipFunctionDialog {
  /deep/ .el-dialog__body {
    padding: 0;
  }
}

.vipFunctionDialog {
  .tableBox {
    padding: 20px;
    width: 100%;
    overflow: hidden;
  }
}

.qrCodeDialog {
  div {
    width: 100%;
    padding: 20px;
  }

  img {
    width: 100%;
  }
}

.vipBox {
  padding: 20px;
  padding-top: 0;
  height: 400px;
  overflow-y: auto;

  .statusBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 12px;

    .left {
      font-size: 16px;
      font-weight: bold;
      color: #f56c6c;
      display: flex;
      align-items: center;
      flex: 1;

      &.isVIP {
        color: #e6a23c;
      }

      span {
        margin-right: 12px;
      }
    }

    .right,
    .center {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      .btn {
        font-weight: bold;
        color: #409eff;
        cursor: pointer;
        user-select: none;
      }
    }
  }

  .desc {
    padding: 12px;
    background-color: #f5f5f5;
    margin: 12px 0;
    font-size: 12px;
  }

  .row {
    display: flex;
    align-items: center;
  }

  p {
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 0;
    }

    .text {
      flex-shrink: 0;
    }

    a {
      color: #409eff;
    }

    .btn {
      color: #409eff;
      cursor: pointer;
    }

    .emphasize {
      font-weight: bold;
      color: #409eff;
    }
  }
}
</style>
