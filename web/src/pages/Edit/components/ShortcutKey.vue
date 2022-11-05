<template>
  <Sidebar ref="sidebar" :title="$t('shortcutKey.title')">
    <div class="box">
      <div v-for="item in shortcutKeyList" :key="item.type">
        <div class="title">{{ item.type }}</div>
        <div class="list" v-for="item2 in item.list" :key="item2.value">
          <div class="item">
            <span
              v-if="item2.icon"
              class="icon iconfont"
              :class="[item2.icon]"
            ></span>
            <span class="name">{{ item2.name }}</span>
            <div class="value">{{ item2.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar'
import { shortcutKeyList } from '@/config'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:54:14
 * @Desc: 快捷键
 */
export default {
  name: 'ShortcutKey',
  components: {
    Sidebar
  },
  data() {
    return {}
  },
  computed: {
    shortcutKeyList() {
      return shortcutKeyList[this.$i18n.locale] || shortcutKeyList.zh
    }
  },
  created() {
    this.$bus.$on('showShortcutKey', () => {
      this.$refs.sidebar.show = false
      this.$nextTick(() => {
        this.$refs.sidebar.show = true
      })
    })
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 0 20px;

  .title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin: 26px 0 20px;
  }

  .list {
    font-size: 14px;

    .item {
      display: flex;
      align-items: center;
      margin-bottom: 15px;

      .icon {
        font-size: 16px;
        margin-right: 16px;
      }

      .name {
        color: #333;
      }

      .value {
        color: #909090;
        margin-left: auto;
      }
    }
  }
}
</style>
