<template>
    <div id="app">
        <!-- <BatchEditConfig businessType="1" /> -->

        <Button @click="showBatchEdit = true" type="primary">打开批量编辑</Button>

        <BatchEditModal
            v-model="showBatchEdit"
            :assetIds="['LAND_1', 'LAND_2', 'BUILDING_1']"
            @submit="handleSubmit"
        />
    </div>
</template>

<script>
// import BatchEditConfig from "./components/zdpz/views/batch-edit-config/BatchEditConfig.vue";
import BatchEditModal from "./components/plbj/views/batchEdit/index.js";

export default {
    name: "App",
    components: {
        // BatchEditConfig,
        BatchEditModal,
    },
    data() {
        return {
            showBatchEdit: false,
        };
    },
    methods: {
        handleSubmit(data) {
            console.log("批量编辑提交的数据:", data);
        },
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html, body {
    overflow-x: hidden;
    height: 100%;
}

#app {
    height: 100%;
}
</style>
