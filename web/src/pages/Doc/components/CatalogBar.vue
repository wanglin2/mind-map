<template>
  <div class="catalogBarContainer">
    <div class="catalogBarTitle">{{ pageCatalogTitle }}</div>
    <div class="catalogList">
      <div
        class="catalogItem"
        v-for="(item, index) in list"
        :key="item.title + index"
        :class="{ active: item.title === activeCatalog }"
        @click="scrollTo(item, index)"
      >
        {{ item.title }}
      </div>
      <div
        v-if="activeCatalogIndex !== -1"
        class="activeBar"
        :style="{ top: 4 + activeCatalogIndex * 28 + 'px' }"
      ></div>
    </div>
  </div>
</template>

<script>
import t from '../i18n'

export default {
  props: {
    scrollTop: {
      type: Number
    }
  },
  data() {
    return {
      lang: '',
      list: [],
      activeCatalog: '',
      activeCatalogIndex: -1,
      appointCatalog: true
    }
  },
  computed: {
    pageCatalogTitle() {
      return t('pageCatalog', this.lang)
    }
  },
  watch: {
    $route(newVal, oldVal) {
      this.initLang()
      this.initCatalogList(newVal.path, oldVal.path)
    },
    scrollTop() {
      this.onScroll()
    },
    lang(newVal, oldVal) {
      if (!oldVal) {
        return
      }
      this.initCatalogList()
    }
  },
  mounted() {
    this.initLang()
    this.initCatalogList()
    this.scrollToCatalog()
  },
  methods: {
    // 获取当前语言
    initLang() {
      let lang = /^\/(doc|help)\/([^\/]+)\//.exec(this.$route.path)
      if (lang && lang[2]) {
        this.lang = lang[2]
      }
    },

    // 初始化二级标题目录
    initCatalogList(newPath, oldPath) {
      let newPathRes = /^\/(doc|help)\/[^\/]+\/([^\/]+)/.exec(newPath)
      let oldPathRes = /^\/(doc|help)\/[^\/]+\/([^\/]+)/.exec(oldPath)
      // 语言变了、章节变了，需要重新获取二级标题目录
      if ((!newPath && !oldPath) || newPathRes[2] !== oldPathRes[2]) {
        this.$emit('scroll', 0)
        this.resetActive()
        let container = document.getElementById('doc')
        let els = document.querySelectorAll('#doc h2')
        this.list = Array.from(els).map(item => {
          return {
            title: item.textContent,
            top: item.offsetTop - container.offsetTop
          }
        })
      }
    },

    // 如果url中存在二级标题，那么滚动到该标题所在位置
    scrollToCatalog() {
      let url = /^\/(doc|help)\/[^\/]+\/[^\/]+\/([^\/]+)($|\/)/.exec(this.$route.path)
      if (url && url[2]) {
        let h = decodeURIComponent(url[2])
        let item = this.list.find(item => {
          return item.title === h
        })
        let index = this.list.findIndex(item => {
          return item.title === h
        })
        if (item) {
          this.activeCatalog = item.title
          this.activeCatalogIndex = index
          this.$emit('scroll', item.top)
        }
      }
    },

    // 手动点击切换到指定二级标题
    scrollTo(item, index) {
      this.appointCatalog = true
      this.routeToNewCatalog(item.title)
      this.$nextTick(() => {
        this.activeCatalog = item.title
        this.activeCatalogIndex = index
        this.scrollToCatalog()
      })
    },

    // 路由到指定二级标题
    routeToNewCatalog(title) {
      let path = this.$route.path
      let url = ''
      if (!title) {
        url = path.replace(/^(\/(doc|help)\/[^\/]+\/[^\/]+)($|\/|.*)$/, '$1')
      } else if (/^\/(doc|help)\/[^\/]+\/[^\/]+($|\/)$/.test(path)) {
        url = path.replace(
          /^(\/(doc|help)\/[^\/]+\/[^\/]+)($|\/)$/,
          '$1/' + encodeURIComponent(title)
        )
      } else {
        url = path.replace(
          /^(\/(doc|help)\/[^\/]+\/[^\/]+\/)([^\/]+)($|\/)/,
          (...args) => {
            return args[1] + encodeURIComponent(title)
          }
        )
      }
      if (path === url) {
        return
      }
      this.$router.push(url)
    },

    // 文档滚动时判断当前滚动到哪个二级标题
    onScroll() {
      if (this.appointCatalog) {
        this.appointCatalog = false
        return
      }
      let find = false
      for (let i = 0; i < this.list.length; i++) {
        let cur = this.list[i]
        let next = this.list[i + 1]
        if (this.scrollTop >= cur.top && (!next || this.scrollTop < next.top)) {
          find = true
          if (cur.title === this.activeCatalog) {
            break
          }
          this.activeCatalog = cur.title
          this.activeCatalogIndex = i
          this.routeToNewCatalog(cur.title)
          break
        }
      }
      if (!find) {
        this.resetActive()
        this.routeToNewCatalog('')
      }
    },

    resetActive() {
      this.activeCatalog = ''
      this.activeCatalogIndex = -1
    }
  }
}
</script>

<style lang="less" scoped>
.catalogBarContainer {
  width: 20%;
  flex-shrink: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 60px;
  padding-bottom: 30px;
  padding-left: 20px;

  .catalogBarTitle {
    font-weight: 700;
    margin-bottom: 4px;
    text-transform: uppercase;
    font-size: 11px;
    letter-spacing: 0.4px;
  }

  .catalogList {
    position: relative;

    .catalogItem {
      color: rgba(60, 60, 60, 0.7);
      transition: color 0.5s;
      line-height: 28px;
      display: block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;

      &.active {
        color: rgba(60, 60, 60, 1);
        font-weight: bold;
      }
    }

    .activeBar {
      position: absolute;
      left: -10px;
      width: 4px;
      height: 20px;
      background-color: #1ea59a;
      border-radius: 4px;
      transition: top 0.25s cubic-bezier(0, 1, 0.5, 1), opacity 0.25s,
        background-color 0.5s;
    }
  }
}
</style>
