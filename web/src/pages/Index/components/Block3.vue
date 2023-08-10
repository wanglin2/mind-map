<template>
  <div class="block3Container">
    <div class="blockContent">
      <div class="picBox"></div>
      <div class="infoBox">
        <div class="infoTitle">客户端</div>
        <div class="info">支持Windows、Mac、Linux平台。</div>
        <div class="info">
          在线版数据默认保存在浏览器缓存里，同时也可以操作电脑本地文件，但是在线版受限于网络环境，访问可能比较慢，多个文件切换也不够方便，所以提供客户端版本，功能简单但不简陋。
        </div>
        <div class="btnList">
          <div class="btn">
            <a href="https://pan.baidu.com/s/1huasEbKsGNH2Af68dvWiOg?pwd=3bp3" target="_blank">百度网盘下载</a>
          </div>
          <div class="btn btn2">
            <a href="https://github.com/wanglin2/mind-map/releases" target="_blank">Github下载</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {}
}
</script>

<style lang="less" scoped>
.block3Container {
  background-color: #f0f9fa;
  border-radius: 0 0 350px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .blockContent {
    width: 100%;
    max-width: 1140px;
    height: 520px;
    display: flex;
    align-items: center;

    .picBox {
      width: 500px;
      height: 500px;
      background-image: url('../../../assets/img/index/block3.png');
      flex-shrink: 0;
    }

    .infoBox {
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

          &:hover {
            transform: translateY(-4px);
          }

          &.btn2 {
            background-color: #f5828b;
          }

          a {
            height: 100%;
            padding: 0 20px;
            line-height: 44px;
            color: #fff;
            font-weight: 600;
            font-size: 15px;
            text-decoration: none;
          }
        }
      }
    }
  }
}
</style>
