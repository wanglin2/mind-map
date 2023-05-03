<template>
  <div class="winControl noDrag" v-if="IS_WIN">
    <div class="winControlBtn iconfont iconzuixiaohua" @click="minimize"></div>
    <div
      class="winControlBtn iconfont"
      :class="[isMaximize ? 'icon3zuidahua-3' : 'iconzuidahua']"
      @click="toggleMaximize"
    ></div>
    <div class="winControlBtn iconfont iconguanbi" @click="close"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isMaximize: false
    }
  },
  methods: {
    minimize() {
      window.electronAPI.minimize()
    },

    toggleMaximize() {
      if (this.isMaximize) {
        this.isMaximize = false
        window.electronAPI.unmaximize()
      } else {
        this.isMaximize = true
        window.electronAPI.maximize()
      }
    },

    close() {
      window.electronAPI.close()
    }
  }
}
</script>

<style lang="less" scoped>
.winControl {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  height: 100%;
  .winControlBtn {
    width: 40px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:hover {
      background-color: #ccced1;
    }

    &.iconguanbi {
      &:hover {
        background-color: #e81123;
        color: #fff;
      }
    }
  }
}
</style>
