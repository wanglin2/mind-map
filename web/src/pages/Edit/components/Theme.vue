<template>
  <Sidebar ref="sidebar" :title="$t('theme.title')">
    <div class="themeList" :class="{ isDark: isDark }">
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
import { mapState, mapMutations } from 'vuex'
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
      themeList: [...themeList].reverse(), // ...customThemeList
      themeMap,
      theme: ''
    }
  },
  computed: {
    ...mapState(['activeSidebar', 'isDark'])
  },
  watch: {
    activeSidebar(val) {
      if (val === 'theme') {
        this.theme = this.mindMap.getTheme()
        this.handleDark()
        this.$refs.sidebar.show = true
      } else {
        this.$refs.sidebar.show = false
      }
    }
  },
  created() {
    this.theme = this.mindMap.getTheme()
    this.handleDark()
  },
  methods: {
    ...mapMutations(['setIsDark']),

    useTheme(theme) {
      this.theme = theme.value
      this.handleDark()
      const customThemeConfig = this.mindMap.getCustomThemeConfig()
      const hasCustomThemeConfig = Object.keys(customThemeConfig).length > 0
      if (hasCustomThemeConfig) {
        this.$confirm('你当前自定义过基础样式，是否覆盖？', '提示', {
          confirmButtonText: '覆盖',
          cancelButtonText: '保留',
          type: 'warning'
        })
          .then(() => {
            this.mindMap.setThemeConfig({})
            this.changeTheme(theme, {})
          })
          .catch(() => {
            this.changeTheme(theme, customThemeConfig)
          })
      } else {
        this.changeTheme(theme, customThemeConfig)
      }
    },

    changeTheme(theme, config) {
      this.mindMap.setTheme(theme.value)
      storeConfig({
        theme: {
          template: theme.value,
          config
        }
      })
    },

    handleDark() {
      let target = themeList.find(item => {
        return item.value === this.theme
      })
      this.setIsDark(target.dark)
    }
  }
}
</script>

<style lang="less" scoped>
.themeList {
  padding: 20px;

  &.isDark {
    .name {
      color: #fff;
    }
  }

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
