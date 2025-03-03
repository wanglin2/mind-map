<template>
  <div class="mouseActionContainer" :class="{ isDark: isDark }">
    <el-tooltip
      class="item"
      effect="dark"
      :content="
        useLeftKeySelectionRightKeyDrag
          ? $t('mouseAction.tip2')
          : $t('mouseAction.tip1')
      "
      placement="top"
    >
      <div
        class="btn iconfont"
        :class="[useLeftKeySelectionRightKeyDrag ? 'iconmouseR' : 'iconmouseL']"
        @click="toggleAction"
      ></div>
    </el-tooltip>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

// 鼠标操作设置
export default {
  props: {
    mindMap: {
      type: Object
    },
    isDark: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  computed: {
    ...mapState({
      useLeftKeySelectionRightKeyDrag: state =>
        state.localConfig.useLeftKeySelectionRightKeyDrag
    })
  },
  methods: {
    ...mapMutations(['setLocalConfig']),

    toggleAction() {
      let val = !this.useLeftKeySelectionRightKeyDrag
      this.mindMap.updateConfig({
        useLeftKeySelectionRightKeyDrag: val
      })
      this.setLocalConfig({
        useLeftKeySelectionRightKeyDrag: val
      })
    }
  }
}
</script>

<style lang="less" scoped>
.mouseActionContainer {
  display: flex;
  align-items: center;

  &.isDark{
    .btn {
      color: hsla(0,0%,100%,.6);
    }
  }

  .item {
    margin-right: 12px;

    &:last-of-type {
      margin-right: 0;
    }
  }

  .btn {
    cursor: pointer;
    font-size: 18px;
  }
}
</style>
