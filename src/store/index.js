import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import mutations from "@/store/mutations";
import actions from "@/store/actions";

Vue.use(Vuex)
const state = {
    Article:[], // 首页推荐文章
    articleinfo:{}, // 文章信息
    category:{},  // 文章分类信息
    pag:{}, // 文章标签
    recentArticle:{}, // 最近的文章
    pagecount:'', // 文章的页数
    danmus:[] // 留言
}
// 注册上面引入的各大模块
const store = new Vuex.Store({
    state,    // 共同维护的一个状态，state里面可以是很多个全局状态
    getters,  // 获取数据并渲染
    actions,  // 数据的异步操作
    mutations  // 处理数据的唯一途径，state的改变或赋值只能在这里
})

export default store  // 导出store并在 main.js中引用注册。
