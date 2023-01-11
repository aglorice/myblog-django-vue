const actions = {
    putarticleinfo(content, value) {
        content.commit("putArticleInfo",value)
    },
    // 提交首页的文章数据
    put_start_articles(content, value){
        content.commit("putStartArticles",value)
    },
    // 提交分类信息到vuex
    put_category(content, value){
        content.commit("putCategory",value)
    },
    // 提交标签信息到vuex
    put_pag(content, value){
        content.commit("putPag",value)
    },
    recentarticle(content, value){
        content.commit("recentArticle",value)
    },
}

export default actions
