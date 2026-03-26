<template>
    <div id="app">
        <BatchEditConfig businessType="1" />
    </div>
</template>

<script>
import BatchEditConfig from "./components/zdpz/modules/batch-edit-config/components/BatchEditConfig.vue";

export default {
    name: "App",
    components: {
        BatchEditConfig,
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
}
</style>
