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
      <div class="formulaList customScrollbar">
        <div class="formulaItem" v-for="(item, index) in list" :key="index">
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
import Sidebar from './Sidebar.vue'
import { mapState, mapMutations } from 'vuex'
import { formulaList } from '@/config/constant'

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
      formulaText: '',
      list: []
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

    init() {
      if (!window.katex) return
      this.list = formulaList.map(item => {
        return {
          overview: window.katex.renderToString(
            item,
            this.mindMap.formula.getKatexConfig()
          ),
          text: item
        }
      })
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
