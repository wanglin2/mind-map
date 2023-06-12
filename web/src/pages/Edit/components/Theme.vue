<template>
  <Sidebar ref="sidebar" :title="$t('theme.title')">
    <div class="themeList">
      <div
        class="themeItem"
        v-for="item in themeList"
        :key="item.value"
        @click="useTheme(item)"
        :class="{ active: item.value === theme }"
      >
        <div class="imgBox">
          <img :src="themeMap[item.value]" alt="" />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar'
import { themeList } from 'simple-mind-map/src/constants/constant'
import { storeConfig } from '@/api'
import { mapState } from 'vuex'
import { themeMap } from '@/config/constant.js'
import customThemeList from '@/customThemes'

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:04
 * @Desc: 主题
 */
export default {
  name: 'Theme',
  components: {
    Sidebar
  },
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      themeList: [...themeList].reverse(),// ...customThemeList
      themeMap,
      theme: ''
    }
  },
  computed: {
    ...mapState(['activeSidebar'])
  },
  watch: {
    activeSidebar(val) {
      if (val === 'theme') {
        this.theme = this.mindMap.getTheme()
        this.$refs.sidebar.show = true
      } else {
        this.$refs.sidebar.show = false
      }
    }
  },
  methods: {
    /**
     * @Author: 王林
     * @Date: 2021-06-24 23:04:38
     * @Desc: 使用主题
     */
    useTheme(theme) {
      this.theme = theme.value
      this.mindMap.setTheme(theme.value)
      storeConfig({
        theme: {
          template: theme.value,
          config: this.mindMap.getCustomThemeConfig()
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.themeList {
  padding: 20px;

  .themeItem {
    width: 100%;
    cursor: pointer;
    border-bottom: 1px solid #e9e9e9;
    margin-bottom: 20px;
    padding-bottom: 20px;
    transition: all 0.2s;
    border: 1px solid transparent;

    &:last-of-type {
      border: none;
    }

    &:hover {
      box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
        0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
    }

    &.active {
      border: 1px solid #67c23a;
    }

    .imgBox {
      width: 100%;

      img {
        width: 100%;
      }
    }
    .name {
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
