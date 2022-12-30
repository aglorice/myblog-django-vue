import Vue from 'vue'
import App from './App.vue'
import VueTypedJs from 'vue-typed-js' // 引入打字效果
import ElementUI from 'element-ui'
import {Message} from "element-ui"; // 消息通知组件
// 响应式
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// element的样式
import 'element-ui/lib/theme-chalk/index.css';

import router from "@/router";
import store from "@/store";

Vue.use(VueTypedJs)
Vue.use(ElementUI,Message);
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
