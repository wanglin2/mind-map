<template>
  <Sidebar ref="sidebar" :title="$t('formulaSidebar.title')">
    <div class="box" :class="{ isDark: isDark }">
      <div class="formulaInputBox">
        <el-input
          v-model="formulaText"
          :rows="4"
          resize="none"
          type="textarea"
          :placeholder="$t('formulaSidebar.placeholder')"
          @keydown.native.stop
        />
        <el-button
          size="small"
          style="width: 100%; margin-top: 20px;"
          @click="confirm"
          >{{ $t('formulaSidebar.confirm') }}</el-button
        >
      </div>
      <div class="title">{{ $t('formulaSidebar.common') }}</div>
      <div class="formulaList">
        <div
          class="formulaItem"
          v-for="(item, index) in [...customList, ...list]"
          :key="index"
        >
          <el-button
            v-if="item.custom"
            type="text"
            size="small"
            style="color: red;"
            @click="removeCustomItem(item)"
          >
            &nbsp;&#10006;&nbsp;
          </el-button>
          <div class="overview" v-html="item.overview"></div>
          <div class="text" @click="formulaText = item.text">
            {{ item.text }}
          </div>
        </div>
      </div>
    </div>
  </Sidebar>
</template>

<script>
import Sidebar from './Sidebar'
import { mapState, mapMutations } from 'vuex'
import { formulaList } from '@/config/constant'
import 'katex/dist/katex.min.css'

export default {
  name: 'FormulaSidebar',
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
      formulaText: '',
      list: [],
      customList: []
    }
  },
  computed: {
    ...mapState({
      activeSidebar: state => state.activeSidebar,
      isDark: state => state.localConfig.isDark,
      localConfig: state => state.localConfig
    })
  },

  watch: {
    activeSidebar(val) {
      if (val === 'formulaSidebar') {
        this.$refs.sidebar.show = true
      } else {
        this.$refs.sidebar.show = false
      }
    }
  },
  created() {
    this.$bus.$on('node_active', this.handleNodeActive)
  },
  beforeDestroy() {
    this.$bus.$off('node_active', this.handleNodeActive)
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapMutations(['setActiveSidebar']),

    // 公式字符串转列表项
    _listItemGen(str, isCustom = false) {
      return {
        overview: window.katex.renderToString(
          str,
          this.mindMap.formula.getKatexConfig()
        ),
        text: str,
        custom: isCustom
      }
    },

    init() {
      this.list = formulaList.map(item => this._listItemGen(item, false))
      const customListStr = localStorage.getItem('formulaSidebarCustomList')
      if (customListStr !== null)
        this.customList = JSON.parse(customListStr).map(item =>
          this._listItemGen(item, true)
        )
    },

    handleNodeActive(...args) {
      this.activeNodes = [...args[1]]
      if (
        this.activeNodes.length <= 0 &&
        this.activeSidebar === 'formulaSidebar'
      ) {
        this.setActiveSidebar(null)
      }
    },

    confirm() {
      if (!this.localConfig.openNodeRichText) {
        return this.$message.warning(this.$t('formulaSidebar.tip'))
      }
      let str = this.formulaText.trim()
      if (!str) return
      this.mindMap.execCommand('INSERT_FORMULA', str)

      // 添加到自定义列表，本地缓存
      if (
        this.list.findIndex((v, i) => v['text'] == str) == -1 &&
        this.customList.findIndex((v, i) => v['text'] == str) == -1
      ) {
        this.customList.unshift(this._listItemGen(str, true))
        localStorage.setItem(
          'formulaSidebarCustomList',
          JSON.stringify([...this.customList.map(item => item.text)])
        )
      }
    },

    removeCustomItem(item) {
      const index = this.customList.findIndex(v => v['text'] == item['text'])
      if (index !== -1) {
        this.customList.splice(index, 1)
        localStorage.setItem(
          'formulaSidebarCustomList',
          JSON.stringify([...this.customList.map(item => item.text)])
        )
      }
    }
  }
}
</script>

<style lang="less" scoped>
.box {
  padding: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &.isDark {
    .title {
      color: #fff;
    }

    .formulaList {
      .formulaItem {
        .overview,
        .text {
          color: #fff;
        }

        .text {
          background-color: #363b3f;
        }
      }
    }

    /deep/ .el-textarea__inner {
      background-color: transparent;
      color: #fff;
    }
  }

  .title {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    margin: 10px 0;
    flex-shrink: 0;
  }

  .formulaInputBox {
    flex-shrink: 0;
  }

  .formulaList {
    height: 100%;
    overflow-y: auto;

    .formulaItem {
      position: relative;
      display: flex;
      overflow: hidden;
      align-items: center;
      border: 1px solid #dcdfe6;
      border-bottom: none;

      &:last-of-type {
        border-bottom: 1px solid #dcdfe6;
      }

      .overview,
      .text {
        width: 50%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;
      }

      .overview {
        padding: 10px 0;
        border-right: none;
      }

      .text {
        cursor: pointer;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        border-left: 1px solid #dcdfe6;
        background-color: #fafafa;
      }
    }
  }
}
</style>
