import axios from "axios";//原生的axios
import variable from "@/assets/js/variable";
//用来拦截用的

//创建一个单例

const http=  axios.create({
    baseURL:variable.proxy,
    headers:{"Content-Type":"application/json;charset=utf-8"},
    withCredentials:true  //  #允许跨域携带cookie信息，必须加上
})

//拦截器  -请求拦截
http.interceptors.request.use(config=>{
    config.headers.post['X-CSRFToken'] = sessionStorage.getItem('csrf_token')
    return config;
},err=>{
    return Promise.reject(err)
})

//拦截器  -响应拦截
http.interceptors.response.use(res=>{
    if(res.data.code===200){
        return Promise.resolve(res.data)
        //这里读者们可以根据服务器返回的数据去自行修改
    }else{
        return Promise.reject(res.data)
    }
},err=>{
    return Promise.reject(err)
});

//整体导出
export default http;
