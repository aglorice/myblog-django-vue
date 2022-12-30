
const mutations = {
    modifyShow(state,value){
        state.isShow = value;
    },
    modifyBottomShow(state,value){
        state.bottomisShow = value
    },
    modifyTarShow(state,value){
        state.tarIsShow = value
    },
    putArticle(state,value){
        state.completeArticle = value
    },
    putArticleInfo(state,value){
        state.article = value
    },
     // 浏览成功后，vuex中的浏览量加一，减少请求压力
    modifyPageView(state,value){
        const pageCount  = 0 | state.article.count/10+1
        for (let i =1;i<=pageCount;i++){
            for(let j=0;j<state.articles[i].length;j++){
                if(state.articles[i][j]['id'] ==value){
                    state.articles[i][j]['Pageview'] +=1
                }
            }
        }
    },
     putMusic(state,value){

         this.state.music = value
     }

}

 export default mutations
