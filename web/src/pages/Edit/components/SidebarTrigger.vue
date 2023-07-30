<template>
  <div
    class="sidebarTriggerContainer"
    @click.stop
    :class="{ hasActive: show && activeSidebar, show: show, isDark: isDark }"
  >
    <div class="toggleShowBtn" :class="{hide: !show}" @click="show = !show">
      <span class="iconfont iconjiantouyou"></span>
    </div>
    <div class="trigger">
      <div
        class="triggerItem"
        v-for="item in triggerList"
        :key="item.value"
        :class="{ active: activeSidebar === item.value }"
        @click="trigger(item)"
      >
        <div class="triggerIcon iconfont" :class="[item.icon]"></div>
        <div class="triggerName">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { sidebarTriggerList } from '@/config'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:54:25
 * @Desc: 侧边栏触发器
 */
export default {
  name: 'SidebarTrigger',
  data() {
    return {
      show: true
    }
  },
  computed: {
    ...mapState(['activeSidebar', 'isDark']),

    triggerList() {
      return sidebarTriggerList[this.$i18n.locale] || sidebarTriggerList.zh
    }
  },
  methods: {
    ...mapMutations(['setActiveSidebar']),

    trigger(item) {
      this.setActiveSidebar(item.value)
    }
  }
}
</script>

<style lang="less" scoped>
.sidebarTriggerContainer {
  position: fixed;
  right: -60px;
  margin-top: 110px;
  transition: all 0.3s;
  top: 50%;
  transform: translateY(-50%);

  &.isDark {
    .trigger {
      background-color: #262a2e;

      .triggerItem {
        color: hsla(0,0%,100%,.6);

        &:hover {
          background-color: hsla(0,0%,100%,.05);
        }
      }
    }
  }

  &.show {
    right: 0;
  }

  &.hasActive {
    right: 305px;
  }

  .toggleShowBtn {
    position: absolute;
    left: -6px;
    width: 35px;
    height: 60px;
    background: #409eff;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    transition: left .1s linear;
    z-index: 0;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    display: flex;
    align-items: center;
    padding-left: 4px;

    &.hide {
      left: -8px;

      span {
        transform: rotateZ(180deg);
      }
    }

    &:hover {
      left: -18px;
    }

    span {
      color: #fff;
      transition: all 0.1s;
    }
  }

  .trigger {
    position: relative;
    width: 60px;
    border-color: #eee;
    background-color: #fff;
    box-shadow: 0 2px 16px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    overflow: hidden;

    .triggerItem {
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      color: #464646;
      user-select: none;
      white-space: nowrap;

      &:hover {
        background-color: #ededed;
      }

      &.active {
        color: #409eff;
        font-weight: bold;
      }

      .triggerIcon {
        font-size: 18px;
        margin-bottom: 5px;
      }

      .triggerName {
        font-size: 13px;
      }
    }
  }
}
</style>
