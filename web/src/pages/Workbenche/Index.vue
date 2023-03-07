<template>
    <div class="workbencheContainer">
        <div class="workbencheContent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Workbenche',
}
</script>

<style lang="less" scoped>
.workbencheContainer {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    .workbencheContent {
        flex-grow: 1;
    }
}
</style>