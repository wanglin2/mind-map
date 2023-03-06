<template>
    <div class="workbencheHomeContainer">
        <Sidebar></Sidebar>
        <div class="workbencheHomeContent">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import Sidebar from '../components/Sidebar.vue'

export default {
    components: {
        Sidebar
    }
}
</script>

<style lang="less" scoped>
.workbencheHomeContainer {
    background-color: #f6f8f9;
    width: 100%;
    height: 100%;
    display: flex;

    .workbencheHomeContent {
        flex-grow: 1;
        padding: 20px;
    }
}
</style>