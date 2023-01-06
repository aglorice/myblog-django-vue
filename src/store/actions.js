const actions = {
    putarticle(content,value){
        content.commit("putArticle",value)
    },
    putarticleinfo(content, value) {
        content.commit("putArticleInfo",value)
    },
    modifypageview(content, value){

        content.commit("modifyPageView",value)
    },
    // 提交原始的文章数据
    putoriginalarticles(content, value){
        content.commit("putOriginalArticles",value)
    },
}

export default actions
