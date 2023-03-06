<template>
    <div class="workbencheHeaderContainer">
        <Edit :key="$route.params.id"></Edit>
    </div>
</template>

<script>
import Edit from '../../Edit/Index.vue';

export default {
    components: {
        Edit
    }
}
</script>

<style lang="less" scoped>
.workbencheHeaderContainer {
   
}
</style>