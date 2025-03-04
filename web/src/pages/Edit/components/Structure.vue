<template>
  <Sidebar ref="sidebar" :title="$t('strusture.title')">
    <div class="layoutList" :class="{ isDark: isDark }">
      <div
        class="layoutItem"
        v-for="item in layoutList"
        :key="item.value"
        @click="useLayout(item)"
        :class="{ active: item.value === layout }"
      >
        <div class="imgBox">
          <img :src="layoutImgMap[item.value]" alt="" />
        </div>
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar.vue'
import { layoutList } from 'simple-mind-map/src/constants/constant'
import { storeConfig } from '@/api'
import { mapState } from 'vuex'
import { layoutImgMap } from '@/config/constant.js'

// 结构
export default {
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
      layoutList,
      layoutImgMap,
      layout: ''
    }
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark,
      activeSidebar: state => state.activeSidebar
    })
  },
  watch: {
    activeSidebar(val) {
      if (val === 'structure') {
        this.layout = this.mindMap.getLayout()
        this.$refs.sidebar.show = true
      } else {
        this.$refs.sidebar.show = false
      }
    }
  },
  methods: {
    useLayout(layout) {
      this.layout = layout.value
      this.mindMap.setLayout(layout.value)
      storeConfig({
        layout: layout.value
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layoutList {
  padding: 20px;

  &.isDark {
    .name {
      color: #fff;
    }
  }

  .layoutItem {
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
