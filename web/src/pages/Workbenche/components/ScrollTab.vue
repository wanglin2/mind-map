<template>
    <div class="workbencheScrollTabContainer" ref="container">
        <div class="workbencheScrollTabBox noDrag">
            <div class="workbencheScrollTabList" ref="list" :style="{ transform: `translateX(${listTranslateX}px)` }">
                <div class="workbencheScrollTabItem" v-for="(item, index) in localEditList" :key="item.id"
                    :style="{ width: tabWidth + 'px' }" :class="{ active: $route.params.id === item.id }"
                    @click="openTab(item)">
                    <span class="icon iconfont icondiannao"></span>
                    <span class="text">{{ item.name }}</span>
                    <span class="mask"></span>
                    <span class="icon closeIcon el-icon-close" @click="deleteFile(index)"></span>
                </div>
            </div>
        </div>
        <div class="workbencheScrollTabControl noDrag" ref="control">
            <div class="workbencheScrollTabBtn el-icon-plus" @click="addFile"></div>
            <div class="workbencheScrollTabBtn el-icon-arrow-left" @click="scrollLeft"></div>
            <div class="workbencheScrollTabBtn el-icon-arrow-right" @click="scrollRight"></div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

const MIN_TAB_WIDTH = 100
const MAX_TAB_WIDTH = 220

export default {
    data() {
        return {
            tabWidth: 0,
            tabTotalWidth: 0,
            listTranslateX: 0
        }
    },
    computed: {
        ...mapState(['localEditList']),
    },
    mounted() {
        this.computeTabWidth()
    },
    methods: {
        ...mapMutations(['setLocalEditList']),

        addFile() {
            let item = {
                id: uuidv4(),
                name: '新建文件',
                path: ''
            }
            this.setLocalEditList([...this.localEditList, item])
            this.$nextTick(() => {
                this.openTab(item)
                this.computeTabWidth()
                this.scrollToEnd()
            })
        },

        deleteFile(index) {
            let arr = [...this.localEditList]
            arr.splice(index, 1)
            this.setLocalEditList(arr)
            this.$nextTick(() => {
                this.computeTabWidth()
            })
        },

        computeTabWidth() {
            let containerWidth = this.$refs.container.getBoundingClientRect().width
            let controlWidth = this.$refs.control.getBoundingClientRect().width
            this.tabTotalWidth = containerWidth - controlWidth
            let length = this.localEditList.length
            let tabWidth = Math.floor(this.tabTotalWidth / length)
            if (tabWidth >= MAX_TAB_WIDTH) {
                this.tabWidth = MAX_TAB_WIDTH
            } else if (tabWidth <= MIN_TAB_WIDTH) {
                this.tabWidth = MIN_TAB_WIDTH
            } else {
                this.tabWidth = tabWidth
            }
        },

        scrollLeft() {
            if (this.listTranslateX + this.tabWidth < 0) {
                this.listTranslateX += this.tabWidth
            } else {
                this.listTranslateX = 0
            }
        },

        scrollRight() {
            let maxScroll = this.tabTotalWidth - this.localEditList.length * this.tabWidth
            if (this.listTranslateX - this.tabWidth > maxScroll) {
                this.listTranslateX -= this.tabWidth
            } else {
                this.listTranslateX = maxScroll
            }
        },

        scrollToEnd() {
            if (this.localEditList.length * this.tabWidth <= this.tabTotalWidth) {
                return
            }
            this.listTranslateX = this.tabTotalWidth - this.localEditList.length * this.tabWidth
        },

        openTab(item) {
            this.$router.push({
                name: 'WorkbencheEdit',
                params: {
                    id: item.id
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.workbencheScrollTabContainer {
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
    overflow: hidden;

    .workbencheScrollTabBox {
        overflow: hidden;
        height: 100%;

        .workbencheScrollTabList {
            display: flex;
            width: max-content;
            height: 100%;
            transition: all 0.3s;

            .workbencheScrollTabItem {
                flex-shrink: 0;
                height: 100%;
                font-size: 12px;
                padding: 0 10px;
                position: relative;
                display: flex;
                align-items: center;
                cursor: pointer;
                user-select: none;

                .icon {

                    &.closeIcon {
                        position: absolute;
                        right: 10px;
                        top: 50%;
                        transform: translateY(-50%);
                        display: none;
                    }
                }

                .mask {
                    position: absolute;
                    right: 0;
                    top: 0;
                    width: 20px;
                    height: 100%;
                    background-color: #fff;
                    box-shadow: -10px 0 10px #fff;
                    display: none;
                }

                &:hover {
                    background-color: #fff;

                    .mask {
                        display: block;
                    }

                    .closeIcon {
                        display: block;
                    }
                }

                &::after {
                    content: '';
                    position: absolute;
                    width: 1px;
                    height: 10px;
                    background-color: #999;
                    top: 50%;
                    transform: translateY(-50%);
                    right: 0;
                }

                &.active {
                    background-color: #fff;

                    &::after {
                        display: none;
                    }
                }

                .text {}
            }
        }
    }

    .workbencheScrollTabControl {
        flex-shrink: 0;
        padding: 0 10px;
        height: 100%;
        display: flex;

        .workbencheScrollTabBtn {
            width: 20px;
            height: 100%;
            cursor: pointer;
            font-size: 14px;
            color: #000;
            margin: 0 5px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>