<template>
  <div class="searchContainer" :class="{ isDark: isDark, show: show }">
    <div class="closeBtnBox">
      <span class="closeBtn el-icon-close" @click="close"></span>
    </div>
    <div class="searchInputBox">
      <el-input
        ref="searchInputRef"
        :placeholder="$t('search.searchPlaceholder')"
        size="small"
        v-model="searchText"
        @keyup.native.enter.stop="onSearchNext"
        @keydown.native.stop
        @focus="onFocus"
        @blur="onBlur"
      >
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <el-button
          size="small"
          slot="append"
          v-if="!isUndef(searchText)"
          @click="showReplaceInput = true"
          >{{ $t('search.replace') }}</el-button
        >
      </el-input>
      <div class="searchInfo" v-if="showSearchInfo">
        {{ currentIndex }} / {{ total }}
      </div>
    </div>
    <el-input
      v-if="showReplaceInput"
      ref="replaceInputRef"
      :placeholder="$t('search.replacePlaceholder')"
      size="small"
      v-model="replaceText"
      style="margin: 12px 0;"
      @keydown.native.stop
      @focus="onFocus"
      @blur="onBlur"
    >
      <i slot="prefix" class="el-input__icon el-icon-edit"></i>
      <el-button size="small" slot="append" @click="hideReplaceInput">{{
        $t('search.cancel')
      }}</el-button>
    </el-input>
    <div class="btnList" v-if="showReplaceInput">
      <el-button size="small" :disabled="isReadonly" @click="replace">{{
        $t('search.replace')
      }}</el-button>
      <el-button size="small" :disabled="isReadonly" @click="replaceAll">{{
        $t('search.replaceAll')
      }}</el-button>
    </div>
    <div
      class="searchResultList"
      :style="{ height: searchResultListHeight + 'px' }"
    >
      <div
        class="searchResultItem"
        v-for="item in searchResultList"
        :key="item.id"
        :title="item.name"
        v-html="item.text"
      ></div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { isUndef, getTextFromHtml } from 'simple-mind-map/src/utils/index'

// 搜索替换
export default {
  name: 'Search',
  props: {
    mindMap: {
      type: Object
    }
  },
  data() {
    return {
      show: false,
      searchText: '',
      replaceText: '',
      showReplaceInput: false,
      currentIndex: 0,
      total: 0,
      showSearchInfo: false,
      searchResultListHeight: 0,
      searchResultList: []
    }
  },
  computed: {
    ...mapState({
      isReadonly: state => state.isReadonly,
      isDark: state => state.localConfig.isDark
    })
  },
  watch: {
    searchText() {
      if (isUndef(this.searchText)) {
        this.currentIndex = 0
        this.total = 0
        this.showSearchInfo = false
      }
    }
  },
  created() {
    this.$bus.$on('show_search', this.showSearch)
    this.mindMap.on('search_info_change', this.handleSearchInfoChange)
    this.mindMap.on('node_click', this.blur)
    this.mindMap.on('draw_click', this.blur)
    this.mindMap.on('expand_btn_click', this.blur)
    this.mindMap.on(
      'search_match_node_list_change',
      this.onSearchMatchNodeListChange
    )
    this.mindMap.keyCommand.addShortcut('Control+f', this.showSearch)
    window.addEventListener('resize', this.setSearchResultListHeight)
  },
  mounted() {
    this.setSearchResultListHeight()
  },
  beforeDestroy() {
    this.$bus.$off('show_search', this.showSearch)
    this.mindMap.off('search_info_change', this.handleSearchInfoChange)
    this.mindMap.off('node_click', this.blur)
    this.mindMap.off('draw_click', this.blur)
    this.mindMap.off('expand_btn_click', this.blur)
    this.mindMap.off(
      'search_match_node_list_change',
      this.onSearchMatchNodeListChange
    )
    this.mindMap.keyCommand.removeShortcut('Control+f', this.showSearch)
    window.removeEventListener('resize', this.setSearchResultListHeight)
  },
  methods: {
    isUndef,

    handleSearchInfoChange(data) {
      this.currentIndex = data.currentIndex + 1
      this.total = data.total
      this.showSearchInfo = true
    },

    showSearch() {
      this.$bus.$emit('closeSideBar')
      this.show = true
      // this.$refs.searchInputRef.focus()
    },

    hideReplaceInput() {
      this.showReplaceInput = false
      this.replaceText = ''
    },

    // 输入框聚焦时，禁止思维导图节点响应按键事件自动进入文本编辑
    onFocus() {
      this.mindMap.updateConfig({
        enableAutoEnterTextEditWhenKeydown: false
      })
    },

    // 输入框失焦时恢复
    onBlur() {
      this.mindMap.updateConfig({
        enableAutoEnterTextEditWhenKeydown: true
      })
    },

    // 画布，节点点击时让输入框失焦
    blur() {
      if (this.$refs.searchInputRef) {
        this.$refs.searchInputRef.blur()
      }
      if (this.$refs.replaceInputRef) {
        this.$refs.replaceInputRef.blur()
      }
    },

    onSearchNext() {
      this.mindMap.search.search(this.searchText, () => {
        this.$refs.searchInputRef.focus()
      })
    },

    replace() {
      this.mindMap.search.replace(this.replaceText, true)
    },

    replaceAll() {
      this.mindMap.search.replaceAll(this.replaceText)
    },

    close() {
      this.show = false
      this.showSearchInfo = false
      this.total = 0
      this.currentIndex = 0
      this.searchText = ''
      this.hideReplaceInput()
      this.mindMap.search.endSearch()
    },

    onSearchMatchNodeListChange(list) {
      this.searchResultList = list.map(item => {
        const data = item.data || item.nodeData.data
        let name = data.text
        const id = data.uid
        if (data.richText) {
          name = getTextFromHtml(name)
        }
        const reg = new RegExp(`${this.searchText.trim()}`, 'g')
        name.replace(reg, (a, b, c) => {
          console.log(a, b, c)
        })
        const text = ''
        return {
          data: item,
          id,
          text,
          name
        }
      })
    },

    setSearchResultListHeight() {
      this.searchResultListHeight = window.innerHeight - 267 - 24
    }
  }
}
</script>

<style lang="less" scoped>
.searchContainer {
  position: relative;
  background-color: #fff;
  padding: 16px;
  width: 296px;
  border-radius: 12px;
  box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 110px;
  right: -296px;
  transition: all 0.3s;

  &.isDark {
    background-color: #363b3f;

    .closeBtnBox {
      color: #fff;
      background-color: #363b3f;
    }
  }

  &.show {
    right: 20px;
  }

  .btnList {
    display: flex;
    justify-content: flex-end;
  }

  .closeBtnBox {
    position: absolute;
    right: -5px;
    top: -5px;
    width: 20px;
    height: 20px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);

    .closeBtn {
      font-size: 16px;
    }
  }

  .searchInputBox {
    position: relative;

    .searchInfo {
      position: absolute;
      right: 70px;
      top: 50%;
      transform: translateY(-50%);
      color: #909090;
      font-size: 14px;
    }
  }

  .searchResultList {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 0.1);
    border-radius: 12px;
    margin-top: 5px;
    overflow-y: auto;

    .searchResultItem {
      height: 30px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      .match {
        
      }
    }
  }
}
</style>
