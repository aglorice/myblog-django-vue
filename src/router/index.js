import Vue from "vue";
import VueRouter from "vue-router";

const NotFoundComponent = ()=> import ("@/components/NotFoundComponent"); // 关于
const Remind = ()=> import ("@/views/about"); // 关于
const Categorize = ()=> import("@/views/category");
const Pag = ()=> import("@/views/pag");
const Article = ()=> import("@/views/Article");
const Home = ()=> import("@/views/index");
const detailArticle = ()=> import("@/views/detailarticle")
const dateTime = ()=> import("@/views/datetime")
const friend = ()=> import("@/views/friend")
const ChaseFan = ()=> import('@/views/chasefan')
const categoryArticle = ()=> import('@/views/categoryArticle')
const pagArticle = ()=> import('@/views/pagArticle')

Vue.use(VueRouter);

const routes = [
    {
        path:'*',
        component:NotFoundComponent,
        meta:{
            title:'404'
        }

    },
    {
        path:'',
        redirect:'/index',

    },
    {
        path: '/index',
        component:Home,
        meta:{
            title:'友人的Blog'
        }
    },
    {
        path: '/article',
        component:Article,
        meta:{
            title:'文章|友人的Blog'
        },
    },
    {
        path: '/article/category/:category',
        component: categoryArticle,
        meta:{
            title:'文章|友人的Blog'
        },
    },
    {
        path: '/article/pag/:pag',
        component: pagArticle,
        meta:{
            title:'文章|友人的Blog'
        },
    },
    {
        path:'/article/details/:id',
        component:detailArticle,
        props:true,
        meta: {
            title: '文章详细'
        }
    },
    {
        path: '/categorize',
        component:Categorize,

        meta:{
            title:'分类|友人的Blog'
        }
    },
    {
        path: '/pag',
        component:Pag,
        meta:{
            title:'标签|友人的Blog'
        }
    },
    {
        path: '/datetime',
        component:dateTime,
        meta: {
            title: '归档|友人的Blog'
        }
    },
    {
        path: '/friend',
        component:friend,
        meta: {
            title: '友人帐|友人的Blog'
        }
    },
    {
        path: '/about',
        component:Remind,
        meta:{
            title:'关于|友人的Blog'
        }
    },
    {
        path: '/chasefan',
        component:ChaseFan,
        meta: {
            title: '追番|友人的Blog'
        }
    },
]


const router =  new VueRouter({
    mode: 'history',
    routes,

})

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function(location) {
    return originalPush.call(this, location).catch(err => {
        err
    })
};

// vue的路由守卫()
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
})
export default router;
