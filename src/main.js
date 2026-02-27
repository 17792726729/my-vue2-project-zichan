import Vue from 'vue';
import App from './App.vue';
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';

Vue.config.productionTip = false;

// 使用 ViewUI 插件
Vue.use(ViewUI);

new Vue({
    render: h => h(App),
}).$mount('#app');