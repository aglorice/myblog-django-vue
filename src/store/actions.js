const actions = {
    modifyshow(content,value){
        content.commit("modifyShow",value)
    },
    modifybottomshow(content,value){ // 底部信息
        content.commit("modifyBottomShow",value)
    },
    modifytarshow(content,value){
        content.commit("modifyTarShow",value)
    },
    putarticle(content,value){
        content.commit("putArticle",value)
    },
    putarticleinfo(content, value) {
        content.commit("putArticleInfo",value)
    },
    modifypageview(content, value){

        content.commit("modifyPageView",value)
    },
    putmusic(content, value){

        content.commit("putMusic",value)
    }
}

export default actions
