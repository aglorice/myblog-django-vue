<template>
  <div id="app">
    <vue-element-loading :active="!isRenderStart"
                         id="loading"
                         spinner="line-scale"
                         color="#84DDE0FF"
                         size="60"
                         text="@DARLING in the FRANXX"
                         background-color="rgba(95, 158, 160, 1)"
                         is-full-screen />
    <div v-if="isRenderStart">
      <!--    导航栏-->
      <navigation></navigation>
      <transition :name="transitionName" mode="out-in">
        <keep-alive include="index,Article,category,pag,about,Talking,friend">
          <router-view :articles="Articles"></router-view>
        </keep-alive>
      </transition>
    </div>
<!--    底部设置-->
    <setting></setting>
<!--    底部栏-->
    <pagebottom></pagebottom>
<!--    音乐播放组件-->
    <aplayer></aplayer>
  </div>
</template>

<script>
import VueElementLoading from "vue-element-loading";
import navigation from "@/components/navigation";
import setting from "@/components/setting"; // 底部右侧设置
import pagebottom from "@/components/pagebottom"; // 底部栏
import aplayer from "@/components/aplayer";
import {getArticle} from "@/api/http";
import variable from "@/assets/js/variable";

export default {
  name: 'App',
  data(){
    return{
      screenWidth: 749, // 屏幕宽度
      Articles:[], // 首页文章
      isRenderStart:false,  // 是否开始渲染子组件
      transitionName:'slide-left'
    }
  },
  components: {
    navigation, // 导航栏
    setting, // 设置
    pagebottom , // 底部栏
    aplayer, // 音乐
    VueElementLoading,
  },
  mounted () {
    // 输出佛祖保佑
    this.consoleFz()
    // 初始化主题
    window.document.documentElement.setAttribute("data-theme", 'day');
    // 获取文章信息(前10个)
    this.getarticle()
  },
  created() {
    // 创建看板娘
      window.L2Dwidget.init({
        pluginRootPath: 'live2dw/',
        pluginJsPath: 'lib/',
        pluginModelPath: 'live2d-widget-model-haru_1/assets/',
        tagMode: false,
        debug: false,
        model: {jsonPath: '/live2dw/live2d-widget-model-haru_1/assets/haru01.model.json'},
        display: {position: 'right', width: 150, height: 300},
        mobile: {show: true},
        log: false
      })
  },
  beforeUpdate() {
  },
  methods:{
    //输出佛祖保佑
    consoleFz(){
      console.log([
        "                   _ooOoo_",
        "                  o8888888o",
        "                  88\" . \"88",
        "                  (| -_- |)",
        "                  O\\  =  /O",
        "               ____/`---'\\____",
        "             .'  \\\\|     |//  `.",
        "            /  \\\\|||  :  |||//  \\",
        "           /  _||||| -:- |||||-  \\",
        "           |   | \\\\\\  -  /// |   |",
        "           | \\_|  ''\\---/''  |   |",
        "           \\  .-\\__  `-`  ___/-. /",
        "         ___`. .'  /--.--\\  `. . __",
        "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
        "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
        "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
        "======`-.____`-.___\\_____/___.-`____.-'======",
        "                   `=---='",
        "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
        "         佛祖保佑       永无BUG"
      ].join('\n'));
    },
    // 获取文章的接口
    getarticle(){
      getArticle(null).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '数据获取成功!',
            type: 'success',
            duration: 1500
          });
          let data = res['context']
          // 提交原始的的文章数据
          let completeArticle = []
          for (let item in data) {
            completeArticle.push({
              id: data[item]['id'],
              title: data[item]['title'],
              datetime: data[item]['created_time'],
              category: data[item]['categorize'],
              Pageview: data[item]['page_view'],
              content: data[item]['describe'],
              imgsrc: variable.base_url_img + data[item]['head_img']
            })
          }
          this.Articles = completeArticle

          // 将信息提交到vuex
          this.$store.dispatch('put_start_articles',completeArticle)
          this.$store.dispatch('putpagecount',res['count'])
          // 关闭loading
          this.isRenderStart = true


        } else {
          this.$message({
            type: 'info',
            message: '数据获取失败',
            duration: 1500
          });
        }
      }).catch((err) => {
        console.log(err)
      })

    },



}

}
</script>

<style>
* {
  font-family: "思源宋体 CN VF Regular";
  padding: 0;
  margin: 0;
  font-size: 16px;
  cursor: url('@/assets/img/default.cur'),auto;
}
/*
  解决底部出现滚动条
*/
html {
  overflow-y: scroll;
}

:root {
  overflow-y: auto;
  overflow-x: hidden;
}

:root body {
  position: absolute;
}

body {
  width: 100vw;
  overflow: hidden;
}



#app {
  width: 100vw;
}
/*
  优化侧边滚动条
*/
::-webkit-scrollbar
{
  width: 6px;
  background-color: #F5F5F5;
}

::-webkit-scrollbar-thumb
{
  background-color: #999;
}

/*
  媒体查询，优化页面字体显示
*/
@media (max-width: 750px){
  * {
    font-size: 12px;
  }
  #live2d-widget {
    visibility: hidden;
  }
  #navigation_meum {
    visibility: unset;
  }
  #navigation_body {
    visibility: hidden;
  }
}

/*
  页面进入的动画
*/
.slide-left-enter {
  opacity: 0;
  -webkit-transform: translate(0px, 30px);
  transform: translate(0px, 30px);
}
.slide-left-enter-active{
  transition: all .5s ease;
}
.slide-left-leave-to{
  opacity: 0;
  -webkit-transform: translate(0px, -30px);
  transform: translate(0px, -30px);
}
.slide-left-leave-active {
  transition: all .5s ease;
}
</style>
