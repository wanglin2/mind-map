<template>
  <div
    class="sidebarTriggerContainer"
    @click.stop
    :class="{ show: activeSidebar }"
  >
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
      show: false
    }
  },
  computed: {
    ...mapState(['activeSidebar']),

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
  right: 0px;
  margin-top: 110px;
  transition: all 0.3s;
  top: 50%;
  transform: translateY(-50%);

  &.show {
    right: 305px;
  }

  .trigger {
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
