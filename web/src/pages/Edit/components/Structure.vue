<template>
  <Sidebar ref="sidebar" :title="$t('strusture.title')">
    <div class="layoutGroupList" :class="{ isDark: isDark }">
      <div
        class="laytouGroup"
        v-for="group in layoutGroupList"
        :key="group.name"
      >
        <div class="groupName">{{ group.name }}</div>
        <div class="layoutList">
          <div
            class="layoutItem"
            v-for="item in group.list"
            :key="item"
            @click="useLayout(item)"
            :class="{ active: item === layout }"
          >
            <img :src="layoutImgMap[item]" alt="" />
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar.vue'
import { storeData } from '@/api'
import { mapState } from 'vuex'
import { layoutImgMap } from '@/config/constant.js'
import { layoutGroupList } from '@/config'

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
      layoutImgMap,
      layout: ''
    }
  },
  computed: {
    ...mapState({
      isDark: state => state.localConfig.isDark,
      activeSidebar: state => state.activeSidebar,
      supportRightFishbone: state => state.supportRightFishbone
    }),

    layoutGroupList() {
      const groupList = layoutGroupList[this.$i18n.locale] || layoutGroupList.zh
      return groupList.map(group => {
        let list = [...group.list]
        if (!this.supportRightFishbone) {
          list = list.filter(item => {
            return !['rightFishbone', 'rightFishbone2'].includes(item)
          })
        }
        return {
          name: group.name,
          list
        }
      })
    }
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
      this.layout = layout
      this.mindMap.setLayout(layout)
      storeData({
        layout: layout
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layoutGroupList {
  width: 100%;
  padding: 20px;

  &.isDark {
    .laytouGroup {
      .groupName {
        color: #fff;
      }
    }
  }

  .laytouGroup {
    width: 100%;
    margin-bottom: 12px;

    .groupName {
      font-weight: 500;
      color: #303133;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .layoutList {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .layoutItem {
        width: 120px;
        height: 70px;
        cursor: pointer;
        border: 1px solid #e9e9e9;
        transition: all 0.2s;
        overflow: hidden;
        margin-bottom: 12px;
        padding: 5px;
        border-radius: 5px;

        &:hover {
          box-shadow: 0 1px 2px -2px rgba(0, 0, 0, 0.16),
            0 3px 6px 0 rgba(0, 0, 0, 0.12), 0 5px 12px 4px rgba(0, 0, 0, 0.09);
        }

        &.active {
          border: 1px solid #409eff;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
