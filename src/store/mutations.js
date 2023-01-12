
const mutations = {
    putArticleInfo(state,value){
        state.articleinfo = value
    },

    // 将首页的数据保存到vuex中
    putStartArticles(state,value){
        state.Article = value
    },
    putCategory(state,value){
        state.category = value
    },
    putPag(state,value){
        state.pag = value
    },
    recentArticle(state,value){
        state.recentArticle = value
    },
    putPageCount(state,value){
        state.pagecount = value
    },
}

 export default mutations
