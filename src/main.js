import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import store from "@/store";
import VueTypedJs from 'vue-typed-js' // 引入打字效果
import ElementUI from 'element-ui'
import {Message} from "element-ui"; // 消息通知组件
// 响应式(css)
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// element的样式
import 'element-ui/lib/theme-chalk/index.css';
// markdown 预览组件
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import createCopyCodePlugin from '@kangc/v-md-editor/lib/plugins/copy-code/index';
import '@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css';
import createLineNumbertPlugin from '@kangc/v-md-editor/lib/plugins/line-number/index';
import createTodoListPlugin from '@kangc/v-md-editor/lib/plugins/todo-list/index';
import '@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css';
// highlightjs
import hljs from 'highlight.js';
//echarts
import { LegendComponent } from 'echarts/components';
import * as echarts from "echarts";

echarts.use([LegendComponent]);
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
Vue.use(VMdPreview);
VMdPreview.use(createLineNumbertPlugin()); // 行号
VMdPreview.use(createCopyCodePlugin()); // 复制组件
VMdPreview.use(createTodoListPlugin()); // todolist
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
