<template>
  <div class="headerContainer">
    <div class="left">
      <div class="title">
        <img src="../../../assets/img/logo.png" alt="">
        SimpleMindMap
      </div>
    </div>
    <div class="center">
      <div class="btn" @click="toDemo">{{ demoName }}</div>
      <el-dropdown
        trigger="click"
        placement="bottom-start"
        @command="handleCommand"
      >
        <span class="translateBtn">
          {{ currentLangName }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="item in otherLangList"
            :key="item.path"
            :command="item.path"
            >{{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

      <a href="https://github.com/wanglin2/mind-map" target="_blank">
        <span class="iconfont icongithub"></span>
      </a>
    </div>
    <div class="right"></div>
  </div>
</template>

<script>
import { langList } from '../catalogList'
import t from '../i18n'

export default {
  data() {
    return {
      lang: '',
      currentLangName: '',
      otherLangList: []
    }
  },
  computed: {
    demoName() {
      return t('demo', this.lang)
    }
  },
  watch: {
    $route() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      let lang = /^\/doc\/([^\/]+)\//.exec(this.$route.path)
      if (lang && lang[1]) {
        this.lang = lang[1]
        let currentLang = langList.find(item => {
          return item.path === this.lang
        })
        this.currentLangName = currentLang.name
        this.otherLangList = langList.filter(item => {
          return item.path !== this.lang
        })
      }
    },

    toDemo() {
      this.$router.push('/')
    },

    handleCommand(path) {
      let url = this.$route.path.replace(/^\/doc\/([^\/]+)\//, (...args) => {
        return `/doc/${path}/`
      })
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.headerContainer {
  height: 55px;
  border-bottom: 1px solid rgba(60, 60, 60, 0.12);
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;

  .left {
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .title {
      width: 200px;
      font-size: 24px;
      font-weight: bold;
      display: flex;
      align-items: center;

      img {
        width: 30px;
        margin-right: 10px;
      }
    }
  }

  .center {
    display: flex;
    align-items: center;
    flex-grow: 1;
    justify-content: flex-end;

    .btn {
      color: #213547;
      cursor: pointer;
      transition: color 0.5s;
      margin-right: 15px;
      font-size: 14px;

      &:hover {
        color: #42b883;
      }
    }

    .translateBtn {
      margin-right: 15px;
      font-size: 16px;
      color: #213547;
      cursor: pointer;
      margin-top: 1px;
      display: block;
      font-size: 14px;
    }

    a {
      text-decoration: none;
      color: rgba(60, 60, 60, 0.7);
      transition: color 0.5s;
      margin-right: 15px;

      &:last-of-type {
        margin-right: 0;
      }

      &:hover {
        color: rgba(60, 60, 60, 1);
      }

      .iconfont {
        font-size: 30px;
      }
    }
  }

  .right {
    width: 20%;
  }
}
</style>
