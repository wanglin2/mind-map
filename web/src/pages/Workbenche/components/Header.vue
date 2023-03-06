<template>
    <div class="workbencheHeaderContainer">
        <div class="placeholder"></div>
        <div class="home noDrag" :class="{active: isInHome}">
            <span class="icon iconfont iconzhuye"></span>
            <span class="text">主页</span>
        </div>
        <ScrollTab></ScrollTab>
    </div>
</template>

<script>
import ScrollTab from './ScrollTab.vue'

export default {
    components: {
        ScrollTab
    },
    computed: {
        isInHome() {
            return this.$route.path.includes('home')
        }
    }
}
</script>

<style lang="less" scoped>
.workbencheHeaderContainer {
    width: 100%;
    height: 40px;
    background-color: #ebeef1;
    -webkit-app-region: drag;
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .placeholder {
        width: 100px;
        height: 100%;
        flex-shrink: 0;
    }

    .home {
        padding: 0 10px;
        height: 100%;
        display: flex;
        align-items: center;
        cursor: pointer;
        user-select: none;
        background-color: #e3e6e9;
        flex-shrink: 0;
        font-size: 14px;

        &.active {
            background-color: #fff;
        }

        .icon {
            margin-right: 5px;
        }
    }
}
</style>