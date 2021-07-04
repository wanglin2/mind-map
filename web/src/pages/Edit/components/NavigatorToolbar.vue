<template>
  <div class="navigatorContainer">
		<div class="item">
			<Scale :mindMap="mindMap"></Scale>
		</div>
	</div>
</template>

<script>
import Scale from './Scale';

/**
 * @Author: 王林
 * @Date: 2021-06-24 22:53:10
 * @Desc: 导航器工具栏
 */
export default {
  name: "NavigatorToolbar",
	components: {
		Scale
	},
  props: {
		mindMap: {
      type: Object,
    },
	},
  data() {
    return {};
  },
  created() {},
  methods: {},
};
</script>

<style lang="less" scoped>
.navigatorContainer {
  padding: 0 12px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  background: hsla(0, 0%, 100%, 0.8);
  border-radius: 5px;
  opacity: 0.8;
  height: 44px;
  font-size: 12px;
  display: flex;
	align-items: center;
}
</style>
