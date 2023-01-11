<template>
  <div>
<!--    首页-->
    <div class="container_head">
      <h1>前端小窝</h1>
<!--      打字效果-->
      <vue-typed-js
          class="desc"
          :strings="typingTexts"
          :loop="true"
          :startDelay="300"
          :typeSpeed="200"
          :backSpeed="150"
      >
        <span class="typing"></span>
      </vue-typed-js>
<!--      向下的箭头-->
      <div class="container_down">
        <img @click="updown" src="@/assets/img/icon/down.png" alt="">
      </div>
    </div>
<!--    首页内容-->
    <div class="container-body">
<!--      文章内容-->
      <div class="row container-body-all">
        <div class="col-md-9 col-sm-12">
          <div class="container-body-articles">
            <div class="container-body-article" v-for="(value,index) in articles" :key="index">
              <div class="container-body-article-cover">
                <router-link  :to="`/article/details/${value.id}`"><img   v-lazy="value.imgsrc"  alt=""></router-link>
              </div>
<!--              文章简介-->
              <div class="container-body-article-body">
                <div class="container-body-article-body-div">
                  <div class="article-body-head">
                    <router-link class="container-body-article-router-link" :to="`/article/details/${value.id}`"><h2>{{value.title}}</h2></router-link>
                  </div>
                  <div class="container-body-article-body-div-mid">
                    <div class="article-body-icon">
                      <i class="el-icon-date"></i>
                      <span >{{value.datetime}}</span>
                    </div>
                    <div class="split-line">
                      <el-divider direction="vertical"></el-divider>
                    </div>
                    <div class="article-body-icon">
                      <i class="el-icon-files"></i>
                      <span>{{value.category}}</span>
                    </div>
                    <div class="split-line">
                      <el-divider direction="vertical"></el-divider>
                    </div>
                    <div class="article-body-icon">
                      <i class="el-icon-view"></i>
                      <span >{{value.Pageview}}</span>
                    </div>
                  </div>
                  <div class="article-body-content">
                    <p>{{value.content}}</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
  <!--      侧边栏-->
        <div class="col-md-3 col-sm-12">
          <div class="container-body-cards">
            <myinfo></myinfo>
            <mypublic></mypublic>
            <pag></pag>
            <category></category>
          </div>
        </div>
      </div> <!--row结尾-->
    </div>
  </div>

</template>

<script>
import myinfo from "@/components/rightCard/myInfo";
import mypublic from "@/components/rightCard/mypublic";
import pag from "@/components/rightCard/pag";
import category from "@/components/rightCard/category";
export default {
  name: `index`,
  data(){
    return{
      typingTexts: ["愚者逆时而动，智者顺时而谋."], // 首页文字
      scrollTopSpeed:10, // 向下滑动的速度
    }
  },
  props:['articles'],
  components:{
    myinfo,
    mypublic,
    pag,
    category
  },
  computed:{
  },
  mounted() {

  },
  methods:{
    updown(){
      let scrollTop = Math.floor(document.documentElement.scrollTop || document.body.scrollTop); // 距离顶部的距离
      let screen_height = window.screen.height; // 屏幕高度
      // 开启一个定时器
      let timer = setInterval(()=> {
        document.documentElement.scrollTop = scrollTop + this.scrollTopSpeed;
        scrollTop = document.documentElement.scrollTop;
        // 当距离顶部的距离大于屏幕宽度的时候，将滑轮距离设置为屏幕高度
        if(scrollTop>=screen_height){
          document.documentElement.scrollTop = screen_height;
          clearInterval(timer); // 清除定时器
        }
      }, 1);
    },
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/scss/_handle.scss";
// 放大缩小
@keyframes scaleDraw {  /*定义关键帧、scaleDrew是需要绑定到选择器的关键帧名称*/
  0%{
    transform: scale(1);  /*开始为原始大小*/
  }
  25%{
    transform: scale(1.2); /*放大1.1倍*/
  }
  50%{
    transform: scale(1);
  }
  75%{
    transform: scale(1.2);
  }
}
// 响应式
@media (max-width: 750px){
  .container-body-all {
    width: 100% !important;
  }
  .container-body-article {
    flex-direction:column;
    border-radius: 10px 10px 10px 10px!important;
  }
  .container-body-article-cover {
    border-radius: 10px 10px 0 0!important;
    width: 100% !important;
    img {
      border-radius: 10px 10px 0 0!important;
    }


  }

  .container-body-article-body{
    border-radius: 0 0 10px 10px!important;
  }
}
//首页
.container_head {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-image: url("@/assets/img/backgound-img/index.png");
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  h1 {
    font-family: Noto Serif SC,serif;
    font-size: 3em;
    color: white;
  }

  .desc {
    font-family: Noto Serif SC,serif;
    width: 21em;
    color: white;
    margin-top: 30px;
  }
}
/*
  首页打字效果
*/
.typing {
  font-size: 1.5em;

  height: 1.5em;
}

// 首页文章
.container-body {
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  @include background_color("background_color1");

}
// 首页向下的箭头
.container_down {
  img {
    margin-top: 40vh;
    margin-bottom: 5vh;
    width: 2em;
    height: auto;
    // 放大缩小动画
    -webkit-animation-name: scaleDraw; /*关键帧名称*/
    -webkit-animation-timing-function: ease-in-out; /*动画的速度曲线*/
    -webkit-animation-iteration-count: infinite;  /*动画播放的次数*/
    -webkit-animation-duration: 5s; /*动画所花费的时间*/
  }

}

.container-body-article {
  width: 100%;
  height: 200px;
  margin-bottom: 20px;
  display: flex;
  @include box_shadow("box_shadow_color1");

  border-radius: 10px 10px 10px 10px ;
}
.container-body-all {
  width: 70%;
  margin-top: 20px;
}
.container-body-cards {
  display: flex;
  flex-direction: column;
}
// 首页文章的封面
.container-body-article-cover {
  width: 30%;
  height: 100%;
  background-color: lightskyblue;
  border-radius: 10px 0 0 10px ;
  display: inline-block;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px 0 0 10px;
    transition: all 0.5s; /*transition:过度属性*/
    cursor: pointer;  /*当鼠标进入图片的时候，鼠标的样式变为手型 */
    &:hover{
      /*transform:变形属性，scale：缩放1.1倍 */
      transform: scale(1.1); /*transform:变形属性，scale：缩放1.1倍 */
    }
  }
}
.container-body-article-body {
  flex: 1;
  border-radius: 0 10px 10px 0;
  @include background_color("background_color1");
  @include font_color("font_color1");
}
.container-body-article-body-div {
  margin: 0.8em 0.8em 0 0.8em;
}
//文章简介图标
.container-body-article-body-div-mid {
  width: 100%;
  display: flex;
  flex-direction: row;
  font-weight: lighter;
  margin: 10px 0 10px 0;
}
.article-body-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  i {
    margin-right: 0.5em;
  }
}
.split-line {
  p {
    margin: 0 10px 0 10px;
  }

}
.article-body-content {
  margin: 10px 0 10px 0;
  font-weight: lighter;
  height: 3em;
  // 多行字数溢出省略号
  display:-webkit-box;
  overflow: hidden; /*超出隐藏*/
  text-overflow: ellipsis;/*隐藏后添加省略号*/
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2; //想显示多少行
  // 缩进
  text-indent: 2em;
  p {


  }
}
.article-body-head {
  margin-top: 20px;

  h2 {
    font-size: 1.5em;
    display:-webkit-box;
    overflow: hidden; /*超出隐藏*/
    text-overflow: ellipsis;/*隐藏后添加省略号*/
    -webkit-box-orient:vertical;
    -webkit-line-clamp:1; //想显示多少行
  }
}
.container-body-article-router-link {
  text-decoration: none;
  @include font_color("font_color1");
}
</style>
