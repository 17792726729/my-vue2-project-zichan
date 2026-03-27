import Vue from 'vue';
import App from './App.vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

// VxeTable
import VXETable from 'vxe-table';
import 'vxe-table/lib/style.css';
import VXETablePluginIview from 'vxe-table-plugin-iview';
import 'vxe-table-plugin-iview/dist/style.css';

Vue.config.productionTip = false;

// 使用 ViewUI 插件
Vue.use(ViewUI);

// 使用 VxeTable 插件
VXETable.use(VXETablePluginIview);
Vue.use(VXETable);

new Vue({
    render: h => h(App),
}).$mount('#app');