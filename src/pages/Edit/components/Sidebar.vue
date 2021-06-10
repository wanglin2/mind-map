<template>
  <div class="sidebarContainer" :class="{show: show}">
    <span class="closeBtn el-icon-close" @click="show = false"></span>
    <div class="sidebarHeader" v-if="title">
      {{ title }}
    </div>
    <div class="sidebarContent">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  props: {
    title: {
      type: String,
      default: "",
    },
  },
	data() {
		return {
			show: false
		}
	}
};
</script>

<style lang="less" scoped>
.sidebarContainer {
  position: fixed;
  right: -300px;
  top: 62px;
  bottom: 0;
  width: 300px;
  background-color: #fff;
  border-left: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
	transition: all 0.3s;

	&.show {
		right: 0;
	}

  .closeBtn {
    position: absolute;
    right: 20px;
    top: 12px;
    font-size: 20px;
    cursor: pointer;
  }

  .sidebarHeader {
    width: 100%;
    height: 44px;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .sidebarContent {
    width: 100%;
    height: 100%;
    overflow: auto;
  }
}
</style>
