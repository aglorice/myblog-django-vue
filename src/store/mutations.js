
const mutations = {
    putArticle(state,value){
        state.completeArticle = value
    },
    putArticleInfo(state,value){
        state.article = value
    },
     // 浏览成功后，vuex中的浏览量加一，减少请求压力
    modifyPageView(state,value){
        const pageCount  = 0 | state.completeArticle.count/10+1
        for (let i =1;i<=pageCount;i++){
            for(let j=0;j<state.completeArticle[i].length;j++){
                if(state.completeArticle[i][j]['id'] ==value){
                    state.completeArticle[i][j]['Pageview'] +=1
                }
            }
        }
    },
    putOriginalArticles(state,value){
        // 将所有的数组连接起来
        let OriginalArticles = [];
        for(let item in value){
            OriginalArticles.push(...value[item])
        }
        state.OriginalArticles = OriginalArticles
    }
}

 export default mutations
