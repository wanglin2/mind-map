
<template>
    <div class="workbencheHomeSidebarContainer">
        <div class="workbencheMenuList">
            <div class="workbencheMenuItem" v-for="item in menuList" :key="item.name"
                :class="{ active: $route.name === item.routerName }" @click="toMenu(item.rou
                )">
                <span class="icon iconfont" :class="[item.icon]"></span>
                <span class="text">{{ item.name }}</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menuList: [
                {
                    name: '本地',
                    icon: 'iconbendi1x',
                    routerName: 'WorkbencheHomeLocal'
                }
            ]
        }
    },
    methods: {
        toMenu(routerName) {
            this.$router.push(routerName)
        }
    }
}
</script>

<style lang="less" scoped>
.workbencheHomeSidebarContainer {
    width: 80px;
    background-color: #fff;
    height: 100%;
    flex-shrink: 0;
    padding: 20px 0;

    .workbencheMenuList {
        display: flex;
        flex-direction: column;
        align-items: center;

        .workbencheMenuItem {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: #000;
            width: 60px;
            height: 60px;
            border-radius: 5px;
            cursor: pointer;

            &.active {
                background-color: #f3fbf4;
                color: #56b74b;
            }

            .icon {
                margin-bottom: 5px;
            }

            .text {
                font-size: 14px;
            }
        }
    }
}
</style>