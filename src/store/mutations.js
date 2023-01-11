
const mutations = {
    putArticle(state,value){
        state.completeArticle = value
    },
    putArticleInfo(state,value){
        state.article = value
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
}

 export default mutations
