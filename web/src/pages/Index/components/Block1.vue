<template>
  <div class="block1Container" :style="{ height: height + 'px' }">
    <div class="blockContent">
      <div class="infoBox">
        <div class="blockTitle">Simple mind map</div>
        <Split></Split>
        <div class="infoList">
          <p class="infoRow">是一个思维导图库</p>
          <p class="infoRow">同时也是一个思维导图软件</p>
          <p class="infoRow">开源、免费、强大...</p>
        </div>
        <div class="desc">
          无论你是开发者，还是使用者，只要喜欢思维导图，都能在这个项目里找到你需要的。
        </div>
        <div class="btnBox">
          <div class="btn" @click="useOnline">在线使用</div>
          <div class="btn btn2" @click="jumpDoc">开发文档</div>
        </div>
      </div>
      <div class="picBox">
        <div class="animation1"></div>
        <div class="animation2"></div>
        <div class="animation3"></div>
        <div class="pic"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Split from './Split.vue'

export default {
  components: {
    Split
  },
  data() {
    return {
      height: 0
    }
  },
  created() {
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  mounted() {},
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.height = window.innerHeight
    },

    useOnline() {
      this.$router.push('/')
    },

    jumpDoc() {
      this.$router.push('/doc/zh/')
    }
  }
}
</script>

<style lang="less" scoped>
.block1Container {
  background-color: #f0f9fa;
  border-radius: 0 0 0 450px;
  display: flex;
  justify-content: center;
  align-items: center;

  .blockContent {
    width: 100%;
    max-width: 1140px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .infoBox {
      .blockTitle {
        font-size: 16px;
        color: #1e3547;
        margin-bottom: 10px;
      }

      .infoList {
        margin-top: 20px;

        .infoRow {
          font-size: 45px;
          color: #1e3547;
          font-weight: 700;
          margin-bottom: 20px;
        }
      }

      .desc {
        color: #828f99;
        font-size: 20px;
        line-height: 1.5;
      }

      .btnBox {
        display: flex;
        align-items: center;
        margin-top: 20px;

        .btn {
          height: 44px;
          padding: 0 20px;
          line-height: 44px;
          cursor: pointer;
          background: #1ea59a;
          border-color: #1ea59a;
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          border-radius: 5px;
          transition: all 0.5s;
          margin-right: 10px;

          &:hover {
            transform: translateY(-4px);
          }

          &.btn2 {
              background-color: #f5828b;
          }
        }
      }
    }

    .picBox {
      position: relative;
      .pic {
        width: 500px;
        height: 500px;
        background-image: url('../../../assets/img/index/block1.png');
        background-size: cover;
      }

      .animation1 {
        width: 38px;
        height: 38px;
        border: 7px solid #f5828b;
        border-radius: 50%;
        position: absolute;
        right: -50px;
        bottom: 86px;
        animation-name: zoom1;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        box-shadow: 0 12px 50px 0 rgba(0, 0, 0, 0.14);
      }

      .animation2 {
        border-radius: 50%;
        background-color: #1ea59a;
        box-shadow: 0 20px 30px 0 rgba(48, 61, 114, 0.4);
        position: absolute;
        width: 25px;
        height: 25px;
        top: -60px;
        right: 60px;
        animation: spin 2s infinite alternate;
        bottom: 60px;
      }

      .animation3 {
        border-radius: 50%;
        background-color: #25233a;
        box-shadow: 0 20px 30px 0 rgba(245, 130, 139, 0.4);
        position: absolute;
        width: 25px;
        height: 25px;
        bottom: 50px;
        left: 0px;
        animation: spin 3s infinite alternate;
      }
    }
  }
}

@keyframes zoom1 {
  0% {
    transform: scale(0.9);
  }

  100% {
    transform: scale(1.5);
  }
}

@keyframes spin {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(40px);
  }
}
</style>
