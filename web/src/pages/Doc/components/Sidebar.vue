<template>
  <div class="sideBarContainer">
    <div class="catalogGroupList">
      <div
        class="catalogGroup"
        v-for="(group, groupIndex) in groupList"
        :key="groupIndex"
      >
        <div class="catalogGroupName">{{ group.groupName }}</div>
        <div class="catalogList">
          <div
            class="catalogItem"
            v-for="item in group.list"
            :key="groupIndex + item.path"
            :class="{ active: item.path === currentPath }"
            @click="jump(item)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import catalogList from '../catalogList'

export default {
  data() {
    return {
      groupList: [],
      lang: '',
      currentPath: '',
      type: ''// doc、help
    }
  },
  created() {
    this.initCatalog()
  },
  watch: {
    $route() {
      this.initCatalog()
    }
  },
  methods: {
    jump(item) {
      if (item.path === this.currentPath) {
        return
      }
      this.$router.push(`/${this.type}/${this.lang}/${item.path}`)
    },

    initCatalog() {
      // 目录列表
      let lang = /^\/(doc|help)\/([^\/]+)\//.exec(this.$route.path)
      if (lang && lang[2]) {
        this.type = lang[1]// 判断是开发文档还是帮助文档
        this.lang = lang[2]
        // 过滤出对应文档的章节
        this.groupList = catalogList[this.lang].filter((item) => {
          return item.type === this.type
        })
      }
      // 当前所在路径
      let path = /^\/(doc|help)\/[^\/]+\/([^\/]+)(\/|$)/.exec(this.$route.path)
      if (path && path[2]) {
        this.currentPath = path[2]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.sideBarContainer {
  width: 30%;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: flex-end;
  padding-top: 60px;
  padding-bottom: 30px;
  flex-shrink: 0;

  .catalogGroupList {
    width: 200px;

    .catalogGroup {
      padding-bottom: 16px;

      .catalogGroupName {
        line-height: 20px;
        font-size: 13px;
        font-weight: 600;
        color: #213547;
        transition: color 0.5s;
        padding: 4px 0;
      }

      .catalogList {
        .catalogItem {
          line-height: 20px;
          font-size: 13px;
          font-weight: 500;
          color: rgba(60, 60, 60, 0.7);
          transition: color 0.5s;
          cursor: pointer;
          padding: 4px 0;

          &:hover {
            color: rgba(60, 60, 60, 1);
          }

          &.active {
            color: #1ea59a;
          }
        }
      }
    }
  }
}
</style>
