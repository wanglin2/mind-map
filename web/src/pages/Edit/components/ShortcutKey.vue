<template>
  <Sidebar ref="sidebar" :title="$t('shortcutKey.title')">
    <div class="box" :class="{ isDark: isDark }">
      <div v-for="item in shortcutKeyList" :key="item.type">
        <div class="title">{{ item.type }}</div>
        <div class="list" v-for="item2 in item.list" :key="item2.value">
          <div class="item">
            <span
              v-if="item2.icon"
              class="icon iconfont"
              :class="[item2.icon]"
            ></span>
            <span class="name" :title="item2.name">{{ item2.name }}</span>
            <div class="value" :title="item2.value">{{ item2.value }}</div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar.vue'
import { shortcutKeyList } from '@/config'
import { mapState } from 'vuex'

// 快捷键
export default {
  components: {
    Sidebar
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark,
      activeSidebar: state => state.activeSidebar
    }),

    shortcutKeyList() {
      return shortcutKeyList[this.$i18n.locale] || shortcutKeyList.zh
    }
  },
  watch: {
    activeSidebar(val) {
      if (val === 'shortcutKey') {
        this.$refs.sidebar.show = true
      } else {
        this.$refs.sidebar.show = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 0 20px;

  &.isDark {
    .title {
      color: #fff;
    }

    .list {
      .item {
        .icon {
          color: hsla(0, 0%, 100%, 0.6);
        }
        .name {
          color: hsla(0, 0%, 100%, 0.6);
        }

        .value {
          color: hsla(0, 0%, 100%, 0.3);
        }
      }
    }
  }

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
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .value {
        color: #909090;
        margin-left: auto;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
