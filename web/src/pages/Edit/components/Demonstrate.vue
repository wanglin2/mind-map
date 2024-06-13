<template>
  <div class="demonstrateContainer" :class="{ isDark: isDark }">
    <el-tooltip
      class="item"
      effect="dark"
      :content="$t('demonstrate.demonstrate')"
      placement="top"
    >
      <div class="btn iconfont iconyanshibofang" @click="enterDemoMode"></div>
    </el-tooltip>
    <div
      class="exitDemonstrateBtn"
      @click="exit"
      ref="exitDemonstrateBtnRef"
      v-if="isEnterDemonstrate"
      @mousedown.stop
      @mousemove.stop
      @mouseup.stop
    >
      <span class="icon iconfont iconguanbi"></span>
    </div>
    <div
      class="stepBox"
      ref="stepBoxRef"
      v-if="isEnterDemonstrate"
      @mousedown.stop
      @mousemove.stop
      @mouseup.stop
    >
      <div class="jump" @click="prev" :class="{ disabled: curStepIndex <= 0 }">
        <span class="icon el-icon-back"></span>
      </div>
      <div class="step">{{ curStepIndex + 1 }} / {{ totalStep }}</div>
      <div
        class="jump"
        @click="next"
        :class="{ disabled: curStepIndex >= totalStep - 1 }"
      >
        <span class="icon el-icon-right"></span>
      </div>
      <div class="input">
        <input
          type="text"
          v-model="inputStep"
          @keyup.enter.stop="onEnter"
          @keydown.stop
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    mindMap: {
      type: Object
    },
    isDark: {
      type: Boolean
    }
  },
  data() {
    return {
      isEnterDemonstrate: false,
      curStepIndex: 0,
      totalStep: 0,
      inputStep: ''
    }
  },
  created() {
    this.$bus.$on('demonstrate_jump', this.onJump)
    this.$bus.$on('exit_demonstrate', this.onExit)
  },
  methods: {
    enterDemoMode() {
      this.isEnterDemonstrate = true
      this.$nextTick(() => {
        const el = document.querySelector('#mindMapContainer')
        el.appendChild(this.$refs.exitDemonstrateBtnRef)
        el.appendChild(this.$refs.stepBoxRef)
      })
      this.mindMap.demonstrate.enter()
    },

    exit() {
      this.mindMap.demonstrate.exit()
    },

    onExit() {
      this.isEnterDemonstrate = false
      this.curStepIndex = 0
      this.totalStep = 0
    },

    onJump(index, total) {
      this.curStepIndex = index
      this.totalStep = total
    },

    prev() {
      this.mindMap.demonstrate.prev()
    },

    next() {
      this.mindMap.demonstrate.next()
    },

    onEnter() {
      const num = Number(this.inputStep)
      if (Number.isNaN(num)) {
        this.inputStep = ''
      } else if (num >= 1 && num <= this.totalStep) {
        this.mindMap.demonstrate.jump(num - 1)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.demonstrateContainer {
  display: flex;
  align-items: center;

  &.isDark {
    .btn {
      color: hsla(0, 0%, 100%, 0.6);
    }
  }

  .item {
    margin-right: 12px;

    &:last-of-type {
      margin-right: 0;
    }
  }

  .btn {
    cursor: pointer;
    font-size: 24px;
  }
}

.exitDemonstrateBtn {
  position: absolute;
  right: 40px;
  top: 20px;
  cursor: pointer;
  z-index: 10001;
  pointer-events: all;

  .icon {
    font-size: 28px;
    color: #fff;
  }
}

.stepBox {
  position: absolute;
  right: 40px;
  bottom: 20px;
  pointer-events: all;

  z-index: 10001;
  display: flex;
  align-items: center;

  .step {
    color: #fff;
    margin: 0 12px;
  }

  .jump {
    color: #fff;
    cursor: pointer;

    &.disabled {
      cursor: not-allowed;
      color: #999;
    }
  }

  .input {
    margin-left: 12px;
    display: flex;
    align-items: center;

    input {
      width: 50px;
      height: 30px;
      text-align: center;
      background-color: transparent;
      border: 1px solid #999;
      outline: none;
      color: #fff;
    }
  }
}
</style>
