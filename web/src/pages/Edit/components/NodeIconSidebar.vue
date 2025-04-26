<template>
  <Sidebar ref="sidebar" :title="$t('nodeIconSidebar.title')">
    <div class="box " :class="{ isDark: isDark }">
      <div class="boxHeader">
        <el-tabs v-model="activeName">
          <el-tab-pane
            :label="$t('nodeIconSidebar.icon')"
            name="icon"
          ></el-tab-pane>
          <el-tab-pane
            :label="$t('nodeIconSidebar.sticker')"
            name="image"
          ></el-tab-pane>
        </el-tabs>
        <el-select
          size="mini"
          style="width: 100%; margin-bottom: 10px;"
          v-model="currentType"
          @change="onCurrentTypeChange"
        >
          <el-option
            v-for="item in typeSelectList"
            :key="item.name"
            :label="item.name"
            :value="item.name"
          >
          </el-option>
        </el-select>
      </div>
      <div class="boxContent customScrollbar" ref="boxContentRef">
        <!-- 图标 -->
        <div class="iconBox" v-if="activeName === 'icon'">
          <div
            class="item"
            v-for="item in nodeIconList"
            :key="item.name"
            :data-title="item.name"
          >
            <div class="title">{{ item.name }}</div>
            <div class="list">
              <div
                class="icon"
                v-for="icon in item.list"
                :key="icon.name"
                v-html="getHtml(icon.icon)"
                :class="{
                  selected: iconList.includes(item.type + '_' + icon.name)
                }"
                @click="setIcon(item.type, icon.name)"
              ></div>
            </div>
          </div>
        </div>
        <!-- 贴纸 -->
        <div class="imageBox" v-if="activeName === 'image'">
          <div
            class="item"
            v-for="item in nodeImageList"
            :key="item.name"
            :data-title="item.name"
          >
            <div class="title">{{ item.name }}</div>
            <div class="list">
              <div
                class="icon"
                v-for="image in item.list"
                :key="image.url"
                :class="{
                  selected: nodeImage === image.url
                }"
                @click="setImage(image)"
              >
                <img :src="image.url" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar.vue'
import { mapState } from 'vuex'
import { nodeIconList } from 'simple-mind-map/src/svg/icons'
import { mergerIconList } from 'simple-mind-map/src/utils/index'
import icon from '@/config/icon'
import image from '@/config/image'

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      activeName: 'icon',
      nodeIconList: mergerIconList([...nodeIconList, ...icon]),
      nodeImageList: [...image],
      iconList: [],
      nodeImage: '',
      activeNodes: [],
      currentType: ''
    }
  },
  computed: {
    ...mapState({
      activeSidebar: state => state.activeSidebar,
      isDark: state => state.localConfig.isDark
    }),

    typeSelectList() {
      return this.activeName === 'icon' ? this.nodeIconList : this.nodeImageList
    }
  },
  watch: {
    activeSidebar(val) {
      if (val === 'nodeIconSidebar') {
        this.$refs.sidebar.show = true
      } else {
        this.$refs.sidebar.show = false
      }
    },

    activeName() {
      this.currentType = ''
      this.$refs.boxContentRef.scrollTop = 0
    }
  },
  created() {
    this.$bus.$on('node_active', this.handleNodeActive)
    this.$bus.$on('showNodeIcon', this.handleShowNodeIcon)
  },
  beforeDestroy() {
    this.$bus.$off('node_active', this.handleNodeActive)
    this.$bus.$off('showNodeIcon', this.handleShowNodeIcon)
  },
  methods: {
    handleNodeActive(...args) {
      this.activeNodes = [...args[1]]
      if (this.activeNodes.length > 0) {
        if (this.activeNodes.length === 1) {
          let firstNode = this.activeNodes[0]
          this.nodeImage = firstNode.getData('image') || ''
          this.iconList = firstNode.getData('icon') || [] // 回显图标
        } else {
          this.nodeImage = []
          this.iconList = []
        }
      } else {
        this.iconList = []
        this.nodeImage = ''
      }
    },

    handleShowNodeIcon() {
      this.dialogVisible = true
    },

    // 获取图标渲染方式
    getHtml(icon) {
      return /^<svg/.test(icon) ? icon : `<img src="${icon}" />`
    },

    // 设置icon
    setIcon(type, name) {
      this.activeNodes.forEach(node => {
        const iconList = [...(node.getData('icon') || [])]
        let key = type + '_' + name
        let index = iconList.findIndex(item => {
          return item === key
        })
        // 删除icon
        if (index !== -1) {
          iconList.splice(index, 1)
        } else {
          let typeIndex = iconList.findIndex(item => {
            return item.split('_')[0] === type
          })
          // 替换icon
          if (typeIndex !== -1) {
            iconList.splice(typeIndex, 1, key)
          } else {
            // 增加icon
            iconList.push(key)
          }
        }
        node.setIcon(iconList)
        if (this.activeNodes.length === 1) {
          this.iconList = iconList
        }
      })
    },

    // 设置贴纸
    setImage(image) {
      this.activeNodes.forEach(node => {
        this.nodeImage = image.url
        node.setImage({
          ...image
        })
      })
    },

    onCurrentTypeChange(val) {
      const warp = this.$refs.boxContentRef
      const elList = Array.from(warp.querySelectorAll('.item') || [])
      const tar = elList.find(el => {
        return el.getAttribute('data-title') === val
      })
      if (tar) {
        warp.scrollTop = tar.offsetTop
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &.isDark {
    .title {
      color: #fff;
    }
  }

  .boxHeader {
    width: 100%;
    flex-shrink: 0;
    padding: 0 20px;

    /deep/ .el-tabs__header {
      margin-bottom: 10px;
    }
  }

  .title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
  }

  .boxContent {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 0 20px;
    position: relative;

    .iconBox {
      .item {
        margin-bottom: 20px;
        font-weight: bold;

        &:last-of-type {
          margin-bottom: 0;
        }

        .title {
          margin-bottom: 10px;
        }

        .list {
          display: flex;
          flex-wrap: wrap;

          .icon {
            width: 24px;
            height: 24px;
            margin-right: 10px;
            margin-bottom: 10px;
            cursor: pointer;
            position: relative;

            /deep/ img {
              width: 100%;
              height: 100%;
            }

            /deep/ svg {
              width: 100%;
              height: 100%;
            }

            &.selected {
              &::after {
                content: '';
                position: absolute;
                left: -4px;
                top: -4px;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                border: 2px solid #409eff;
              }
            }
          }
        }
      }
    }

    .imageBox {
      margin-bottom: 20px;
      font-weight: bold;

      &:last-of-type {
        margin-bottom: 0;
      }

      .title {
        margin-bottom: 10px;
      }

      .list {
        display: flex;
        flex-wrap: wrap;

        .icon {
          width: 50px;
          height: 50px;
          margin-right: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          position: relative;

          /deep/ img {
            width: 100%;
            height: 100%;
            object-fit: contain;
          }

          &.selected {
            &::after {
              content: '';
              position: absolute;
              left: -4px;
              top: -4px;
              width: 54px;
              height: 54px;
              border: 2px solid #409eff;
            }
          }
        }
      }
    }
  }
}
</style>
