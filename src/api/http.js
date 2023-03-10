//将拦截器整体导入
import request from '@/api/Interceptor'//导入已经写好的拦截器

// 封装所有的API接口

// 获取文章
export async function getArticle(params){
    return  request({
        url:'/api_article/article/',
        method :'get',
        params:params,
    })
}

// 获取详细文章信息
export async function getDetailArticle(params){
    return  request({
        url:'/api_article/articles/',
        method :'get',
        params:params,
    })
}

// 获取详细分类信息
export async function getCategorize(params){
    return  request({
        url:'/api_categorize/categorize/',
        method :'get',
        params:params,
    })
}

// 获取详细标签信息
export async function getPag(params){
    return  request({
        url: '/api_pag/pag/',
        method: 'get',
        params: params,
    });
}

// 获取详细标签数目信息
export async function getCountPag(params){
    return  request({
        url:'/api_pag/countPag/',
        method :'get',
        params:params,
    })
}

// 获取公告
export async function getAnnouncement(params){
    return  request({
        url:'/api_announcement/announcement/',
        method :'get',
        params:params,
    })
}

// 获取分页
export async function getArticlePage(params){
    return  request({
        url:'/api_article/articlespage/',
        method :'get',
        params:params,
    })
}

// 获取文章数目
export async function getArticleCount(params){
    return  request({
        url:'/api_article/getarticlecount/',
        method :'get',
        params:params,
    })
}

// 获取分类的数目
export async function getCountCategorize(params){
    return  request({
        url:'/api_categorize/countCategorize/',
        method :'get',
        params:params,
    })
}

// 根据qq号获取名字和头像
export async function getQqimg(params){
    return  request({
        url:'/api/qq/',
        method :'get',
        params:params,
    })
}

// 获取音乐
export async function getMusic(params){
    return  request({
        url:'/api_music/getmusic/',
        method :'get',
        params:params,
    })
}



// 提交友链申请
export async function submitFriend(params){
    return request({
        url: '/api_friend/addfriend/',
        method: 'POST',
        params: params,
    });
}

// 获取友链申请
export async function getFriend(params){
    return request({
        url: '/api_friend/getfriend/',
        method: 'get',
        params: params,
    });
}

// 获取番剧列表
export async function getFans(params){
    return request({
        url: '/api/getfans/',
        method: 'get',
        params: params,
    });
}
// 获取关于信息
export async function getAbout(params){
    return request({
        url: '/api_remind/getremind/',
        method: 'get',
        params: params,
    });
}

// 获取最近文章的统计
export async function getArticleTimeCount(params){
    return request({
        url: '/api_article/getArticleTimeCount/',
        method: 'get',
        params: params,
    });
}
// 根据标签获取文章
export async function getPagArticle(params){
    return request({
        url: '/api_article/getpagacticle/',
        method: 'get',
        params: params,
    });
}

// 根据分类获取文章
export async function getCategoryArticle(params){
    return request({
        url: '/api_article/getcategoryarticle/',
        method: 'get',
        params: params,
    });
}

// 获取文章归档
export async function getArticleFiletime(params){
    return request({
        url: '/api_article/getarticlefiletime/',
        method: 'get',
        params: params,
    });
}

// 获取留言板内容

export async function getMessage(params){
    return request({
        url: '/api/getmessage/',
        method: 'get',
        params: params,
    });
}

// 添加留言
export async function addMessage(params){
    return request({
        url: '/api/addmessage/',
        method: 'post',
        params: params,
    });
}

// 获取github贡献数据
export async function getGithub(params){
    return request({
        url: '/api/getgithub/',
        method: 'get',
        params: params,
    });
}
